Bugzilla to Airtable
=================

This project takes bugs from Bugzilla and inserts them as tasks in Airtable.

Prerequisites
-------------

Airtable info:

* API Key
  * Available from your [Account page](https://airtable.com/account)
* Base id
  * Go the your [API page](https://airtable.com/api), which was linked from your account page above
  * Click the base you want to work with
  * The base id is in the URL of the page that loads, eg: https://airtable.com/app8eGNFp6w6us51D/api <- that code inbetween the slashes is your base id
* Project id
  * Go back to your Airtable, and click on the project you want your bugs added to
  * The Airtable URL will be something like: https://airtable.com/asdfasf/asfadfsdf/asfdasfasdf
  * Your project id is the *third* value in that url, after the final slash
* Airtable email
  * Whichever email you log into Airtable with

Bugzilla info:

This is easy - just create a search on Bugzilla, and copy the URL for it.
The only limitation is that it only works for *public* data.

Configuration
-------------

Open the `.env` file, and add the following lines, and populate the values with the configuration values you gathered above.

* AIRTABLE_API_KEY=12345678
* AIRTABLE_BASE_ID=12345678
* AIRTABLE_PROJECT_ID=12345678
* AIRTABLE_EMAIL=your@airtable-account-email.com
* BUGZILLA_SEARCH_URL=""


Operation
-------------

The path /update will check Bugzilla, and add new tasks to Airtable, but only if there's not a task in the base that already has that bug id in the title.

For example, if you remix this Glitch and your project is named "laundry-carnival", You can trigger an update by visiting:

https://laundry-carnival.glitch.me/update

I use [cron-job.org](https://cron-job.org) to periodically open the URL.

That's it!

Made with [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
