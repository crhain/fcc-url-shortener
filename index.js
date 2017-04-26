const express = require('express');
const mongo = require('mongodb').MongoClient;
const fs = require('fs');
const port = process.env.PORT || 5000;
const app = express();
const newPathRegEx = /^(\/new\/http(s?):\/\/)/;
var dbUser = process.env.DB_USER;
var dbPw = process.env.DB_PW;

//if there is no local variable for dbUser, set from file
if(!dbUser){
  let fileStream = fs.readFileSync(__dirname + "/secret/info.txt", 'utf8').split('\n');
  dbUser = fileStream[0];
  dbPw = fileStream[1];
}

const databaseUrl = "mongodb://" + dbUser 
                    + ":" + dbPw + "@ds161048.mlab.com:61048/ffc-url-shortener";

console.log(databaseUrl);

app.use(express.static('public'));


app.get(newPathRegEx, (request, response) => {
    //get path and then slice of first five characters (i.e. /new/)
    const url = request.path.slice(5);
    let successJSON = { "original_url": undefined, "short_url": undefined };
    //add url to database
    addUrlToDatabase(url, (id) => {
        //contsruct succesJSON
        successJSON.original_url = url;
        successJSON.short_url = id; //need to get full url of request minus path + returned id from database
    });
        
    
    //send json response
    response.end(JSON.stringify(successJSON));
});

app.get('/:url', (request, response) => {
    const url = request.params.url;
    //check url to see if it is a number.  If not, then return error

    //check database to see if url exists
        //If it does exist, then redirect browser to url stored in database
    
    //if url does not exist, then return error message
    response.end(url + " Does not exist!");
});

function addUrlToDatabase(url, callback){
    console.log(url + " added to database.");
    callback("5555");
}


app.listen(port, ()=>{
    console.log('Running server on port:' + port);
});