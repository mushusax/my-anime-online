const request = require('request');


//define basic header
let options = {
  url: "https://kitsu.io/api/edge",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  }
};


let search_anime = (content, genre, title, callback) => {
  options.url += `/anime?[genre]=${genre}&page[limit]=1&filter[text]=${title}`;
  request(options, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      callback(undefined, JSON.parse(body));
    }
    else {
      callback("Kitsu API call failed", undefined);
    }
  });//end request
};//end search_anime

module.exports.search_anime = search_anime;
