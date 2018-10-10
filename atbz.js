(async () => {

let Airtable = require('airtable');
let request = require('request');

console.log('ere we go again')

let base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

let bzURL = process.env.BUGZILLA_SEARCH_URL;

let bugs = await bugsearch(bzURL);
bugs.forEach(addBugToAirtable);
  
async function bugsearch(bzURL) {
  try {
    let r = await req({ url: bzURL, json: true });
    return r.bugs;
  } catch(e) {
    console.error(e);
  }
}

async function findBugInAirtable(bug) {
  return new Promise((resolve, reject) => {
    base('Tasks').select({
      // Selecting the first 3 records in Main View:
      maxRecords: 1,
      filterByFormula: "SEARCH('" + bug.id + "', {Name})",
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      resolve(records.length > 0);

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      //fetchNextPage();

    }, function done(err) {
      if (err) { console.error(err); reject(err); }
      resolve(false);
    });
  });
}

async function addBugToAirtable(bug) {
  let wasFound = await findBugInAirtable(bug);
  if (wasFound) {
    return;
  }
    
  let url = 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + bug.id;

  base('Tasks').create({
    "Name": 'Bug ' + bug.id + ': ' + bug.summary,
    "Notes": url,
    "Design Projects": [
       process.env.AIRTABLE_PROJECT_ID
    ],
    "Assignee": {
      "email": process.env.AIRTABLE_EMAIL,
    }
   }, function(err, record) {
     if (err) { console.error(err); return; }
  });
}

// async-ify request module for conveniences
async function req(value) {
  let p = new Promise((resolve, reject) => {
    request(value, (error, response, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
  return p;
}

})();