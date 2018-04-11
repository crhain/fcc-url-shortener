FREECODECAMP URL SHORTENER
==============================

This application was developed for freeCodeCamp. A demo version can be found at [crh-url-short.herokuapp.com/](https://crh-url-short.herokuapp.com/)


OBJECTIVE
--------------------------

Build a full stack JavaScript app that is functionally similar to this: https://little-url.herokuapp.com/ and deploy it to Heroku.

* Note that for each project, you should create a new GitHub repository and a new Heroku project. If you can't remember how to do this, revisit https://freecodecamp.com/challenges/get-set-for-our-api-development-projects.

* Here are the specific user stories you should implement for this project:

* User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

* User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

* User Story: When I visit that shortened URL, it will redirect me to my original link.

Pro Tip: Checkout this wiki article for tips on integrating MongoDB on Heroku.


Running Project
-------------------------------

1. Create a mongodb database and 'url' collection with data records format `{_id: "5555", long_url: "https://www.google.com"}`
2. Add a secret/info.txt file with connect path to mongodb on first line.
or
3. Set DB_URL environmental variable to connect path


To Do
--------------------------------

1. create better hashing function
2. create way to handle hash collisions in database
  - could do a find before insert and compare long_url fields to determine collisions.  do not insert if it exists, but redirect instead?







