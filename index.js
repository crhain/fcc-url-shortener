const express = require('express');
const mongo = require('mongodb').MongoClient;
const fs = require('fs');
const port = process.env.PORT || 5000;
const app = express();
const newPathRegEx = /^(\/new\/http(s?):\/\/)/;
const collectionName = "urls";
let dbUrl = process.env.DB_URL;

//set up static file for base url
app.use(express.static('public'));

//if no environmental variable for DB_URL then set to info in /secret/info.txt
if(!dbUrl){
    dbUrl = fs.readFileSync(__dirname + "/secret/info.txt", 'utf8').split('\n')[0];
}

//console.log(databaseUrl);

//set up path for adding new urls at /new/url
app.get(newPathRegEx, (request, response) => {
    //get path and then slice of first five characters (i.e. /new/)
    const url = request.path.slice(5);
    let successJSON = { original_url: undefined, short_url: undefined };
    //add url to database
    addUrlToDatabase(url, function (id, doc){
        //contsruct succesJSON
        successJSON.original_url = url;
        successJSON.short_url = id; //need to get full url of request minus path + returned id from database        
        response.end(JSON.stringify(successJSON));
    });                    
});

//set up path to redirect to short url
app.get('/:url', (request, response) => {
    const url = request.params.url;
    //check url to see if it is a number.  If not, then return error

    //check database to see if url exists
        //If it does exist, then redirect browser to url stored in database
    
    //if url does not exist, then return error message
    response.end(url + " Does not exist!");
});

//stub function for loading url to mongo database
function addUrlToDatabase(url, callback){    
       connectToDb(dbUrl, (collection, db)=>{
            let id = getHashedUrlId(url);
            //insert new record into database.
            collection.insertOne({_id: id , long_url: url}, callback.bind(null, id));
            db.close();       
       });                       
}

function getUrlFromDatabase(url, callback){
    connectToDb(dbUrl, (collection, db)=>{
        //collection
        db.close();
    });
    
}

function connectToDb(dbUrl, callback){
    mongo.connect(dbUrl, (error, db)=>{
       if(error) {           
           return console.error(error);
       }       
       let collection = db.collection(collectionName);
       callback.bind(null, collection, db)(collection, db);       
    });
}

//function returns a hash for any given url text
function getHashedUrlId(url){
    let hash = 0;
    //add ascii value of every character % 9999
    for(let i = 0; i < url.length; i++){
        hash += url.charCodeAt(i);
    }

    return hash % 9999;
}


app.listen(port, ()=>{
    console.log('Running server on port:' + port);        
});