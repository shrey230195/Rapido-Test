// Q3. Compute per day average temperatures for cities using the API's given below

// a. https://www.metaweather.com/api/location/search/?query=bangalore -> You are going to send the city as query parameter to get woeid
// b. https://www.metaweather.com/api/location/2295420/2018/6/01/ -> Call this API with corresponding woeid and date as url parameters to get the temperatures for that day

// Compute average temperatures per day per city for Bangalore, Mumbai and Delhi on dates June 1st, June 2nd and June 3rd.


var fetch = require("node-fetch");

const baseUrl = 'https://www.metaweather.com/api/';
const cities = ['Bangalore','Mumbai','Delhi'];
const dates = ['2018/6/1','2018/6/2','2018/6/3'];
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;    

getWoeids(baseUrl,cities)

function getWoeids(baseUrl,cities) {
  let urls = cities.map(city => baseUrl + 'location/search/?query=' + city) // build url for cities
  console.log('getting woeids ...')
  Promise.all(urls.map(url =>
    fetch(url)
      .then(checkStatus)                 
      .then(parseJSON)
      .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => {      
    let cities = data.map(city => city[0]); // ge the array of cities with woeids
    console.log('woeids fetch successfully');    
    getConsolidatedWeatherData(cities,dates); // finally call this to get the consolidated weather data
  })
}

function getConsolidatedWeatherData(cities,dates) {
  console.log('fetch consolidated weather data for each city for each date....');
  //generate an array of objects which containes all the info including the url to hit.
  // e.g [{
  //   city : 'Bangalore',
  //   woeid : 2295420,
  //   date : '2018/6/1',
  //   url : 'https://www.metaweather.com/api/location/2295420/2018/6/01/'
  // }]
  let urls = cities.map(city => {
    let url = baseUrl + 'location/' + city.woeid + '/';
    return  dates.map(date => {
      return {  
        city : city.title,
        woeid : city.woeid,
        date : date,
        url : url + date + '/'
      }
    })    
  })
  .reduce((a,b) => a.concat(b),[])
  
  Promise.all(urls.map(url =>
    fetch(url.url)
      .then(checkStatus)                 
      .then(parseJSON)
      .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => {  
    let result = urls.map((url,index) => {
      let allTemperatures = data[index].map(obj => obj.the_temp)
      url.average = average(allTemperatures) // calculating the average of all the 'the_temp' values for a date
      return url
    })

    let cityDateAvgTemp = result.map(obj => 'The Avg. Temperature of ' + obj.city + ' on ' + obj.date + ' was ' + obj.average + ' celcius ')
    cityDateAvgTemp.map(transcript => console.log(transcript))
  })  
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseJSON(response) {
  return response.json();
}


