//Function responsible to get info object of specific city from public API
async function makeRequest(city) {
    const axios = require('axios');

    const key = 'c544f992a7963efe309415b840747537';
    let response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: key
        }
    })

    return response;
}


var http = require('http');

http.createServer(handleradapter(getinfo)).listen(8080);
//Function responsible to distribute tasks 
//requesthandler() handle client request and return array of requests using parseUrl function
//responsehandler() handle get string of requested info then send it to client   
function handleradapter(getinfo) {
    return function (req, res) {
        parsedRequest = requesthandler(req);
        responsehandler(res, getinfo, parsedRequest);
    }
}

//Function responsible to handle client request
//Extract url from req object
//Passing url to parseUrl() 
function requesthandler(req) {
    var msg = req.url;
    parsedRequest = parseUrl(msg);
    return parsedRequest;
}

/*Function responsible to parse url to array and return it ,array contain city in first index 
and rest of array contain info requested by client*/
function parseUrl(msg) {
    //init msg  = /country/?city=Cairo&info=countryname,temp
    var count = 0;
    var str = "";
    var city = ""; //At end of function city will contain cityname like 'cairo'
    var info = ""; //At end of function info will contain requested info like 'countryname,temp'
    //convert '/country/?city=Cairo&info=weather,temp' to '?city=Cairo&info=countryname,temp' 
    for (var x = 0; x < msg.length; x++) {
        if (msg[x] != '?') {
            count++;
        } else {
            break;
        }
    }
    for (var x = count; x < msg.length; x++) {
        str += msg[x];//str = ?city=Cairo&info=countryname,temp 
    }
    var flag = 0;
    //init str = ?city=Cairo&info=countryname,temp 
    for (var x = 0; x < str.length; x++) {
        if (flag == 0 || flag == 2) {
            if (flag == 2) {
                city += str[x];
            }
            if (str[x] == '=') {//take only what come after '='  like city=cairo
                flag = 2;
            }
        }
        if (flag == 1 || flag == 3) {
            if (flag == 3) {
                info += str[x];
            }
            if (str[x] == '=') {//take only what come after '='  like info=countryname,temp
                flag = 3;
            }

        }
        if (str[x + 1] == '?') { flag = 0 }//assume that cityname should come after '?' like ?city=Cairo
        if (str[x + 1] == '&') { flag = 1 }//assume that requested info should come after '&' like &info=countryname,temp 
    }

    var requested = [];  
    var str1 = city + ',' + info;
    requested = str1.split(',');//Conatain city at first index and requested info at rest of it like ['cairo','countryname','temp']

    return requested;
}
//Function responsible to get response from public API and send it to client 
const responsehandler = (res, getinfo, parsedRequest) => {
    //Call back getinfo() to solve promise 
    //then get final info string which contain all client requested info
    //then send info string to client(will appear on browser)
    getinfo(parsedRequest).then(function (result) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var res1 = result;
        res.end(res1);
    });

}
//Function responsible to get info object from public API
//Extract from this object what client are requested using statefunction()
//Then return info string which will appear to client in browser  
function getinfo(request) {
    return makeRequest(request[0]).then(res1 => {
        var data = "";
        data = "{";
        for (var x = 1; x < request.length; x++) {
            data += statefunction(request[x], res1);
            if (x >= 1 && x != request.length - 1) { data += ' ,'; }
        }
        data += "}"
        return data;
    }).catch(error => console.log(''));

}
//Function get info for specific request from client ,then return this info  
function statefunction(request, res1) {
    var str = request.toLowerCase();
    var result = "";
    switch (str) {
        case 'countryname':
            result = "Country name: " + getcountryname(res1);
            break;
        case 'temp':
            result = "Temperature: " + getcitytemperature(res1) + " Kelvin";
            break;
        case 'humidity':
            result = "Humidity: " + getcityhumidity(res1);
            break;
        case 'windspeed':
            result = "Wind speed: " + getwindspeed(res1);
            break;
        case 'winddegree':
            result = "Wind degree: " + getwinddegree(res1);
            break;
        default:
            break;     
    }
    return result;
}

/*************/
//All below functions are responsible to extract specific info from response object
function getcitytemperature(response) {

    const temp = response.data.main.temp;
    const city = response.data.name;
    const res = 'Temperature = ' + temp + ' K in ' + city + ' now';
    console.log(res);
    return temp;
};

function getcityhumidity(response) {

    const humidity = response.data.main.humidity;
    const city = response.data.name;
    const res = 'Humidity = ' + humidity + ' in ' + city + ' now';
    console.log(res);
    return humidity;

};

function getcountryname(response) {

    const name = response.data.sys.country;
    const city = response.data.name;
    const res = 'Country name of ' + city + ' is ' + name;
    console.log(res);
    return name;

};


function getwindspeed(response) {

    const speed = response.data.wind.speed;
    const city = response.data.name;
    const res = 'Wind speed in ' + city + ' is ' + speed;
    console.log(res);
    return speed;

};


function getwinddegree(response) {

    const degree = response.data.wind.deg;
    const city = response.data.name;
    const res = 'Wind degree in ' + city + ' is ' + degree;
    console.log(res);
    return degree;

};

//convert temperature unit from Kelvin to Celsius
function KelvinToCelsius(Kelvintemperature) {
    Celsiustemperature = (Kelvintemperature - 273.15).toPrecision(4);
    return Celsiustemperature;
};


function getcitywindinfo(response) {

    const windspeed = getwindspeed(response);
    const winddegree = getwinddegree(response);
    const city = response.data.name;
    const res = 'Wind speed in ' + city + ' is ' + windspeed + ' ,Wind degree is ' + winddegree;
    console.log(res);
    return res;

};

//get temperature in kelvin then convert it to celsius
//then return result
function getcitytemperatureToCelsius(response) {

    const Kelvintemperature = getcitytemperature(response);
    const Celsiustemperature = KelvinToCelsius(Kelvintemperature);
    const city = response.data.name;
    console.log('Temperature = ' + Celsiustemperature + ' °C in ' + city + ' now');
    return Celsiustemperature;

};

//Function to be tested in test.js  
exports.parseUrl = parseUrl;
exports.getcitytemperature = getcitytemperature;
exports.getcityhumidity = getcityhumidity;
exports.getcountryname = getcountryname;
exports.getwindspeed = getwindspeed;
exports.getwinddegree = getwinddegree;
exports.KelvinToCelsius = KelvinToCelsius;
exports.statefunction = statefunction;
exports.getcitywindinfo = getcitywindinfo;
exports.getcitytemperatureToCelsius = getcitytemperatureToCelsius;