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

    return response.data;
}


var http = require('http');

http.createServer(handler(getinfo)).listen(8080);

function handler(getinfo) {
    return function (req, res) {
        
        
        
        handleradapter(getinfo, req, res);
    }
}
//Function responsible to distribute tasks 
//requesthandler() handle client request and return array of requests using parseUrl function
//responsehandler() handle get string of requested info then send it to client   
async function handleradapter(getinfo, req, res) {
    parsedRequest = requesthandler(req);
    return responsehandler(res, getinfo, parsedRequest);
}
//Function responsible to handle client request
//Extract url from req object
//Passing url to parseUrl() 
function requesthandler(req) {
    var msg = req.url;//  /country/?city=paris&info=countryname,temp
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
async function responsehandler(res, getinfo, parsedRequest) {
    //Call back getinfo() to solve promise 
    //then get final info string which contain all client requested info
    //then send info string to client(will appear on browser)
    /*return getinfo(parsedRequest).then(function (result) {
        console.log(result);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var res1 = result;
        res.end(res1);
        return result;
    });*/
    const result = await getinfo(parsedRequest);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var res1 = result;
    res.end(res1);
    return res1;

}
//Function responsible to get info object from public API
//Extract from this object what client are requested using statefunction()
//Then return info string which will appear to client in browser  
async function getinfo(request) {
    const fs = require('fs');
    var filename = request[0] + ".txt";
    var fullpath = __dirname + "\\Handled Requestes\\" + filename;
    const path = require('path');
    const directoryPath = path.join(__dirname, 'Handled Requestes');
    flag = 0

    //Check exist of request
    fs.readdirSync(directoryPath).forEach(file => {
        if (file == filename) {
            flag = 1;
        }
    });

    if (flag == 1) {
        var data = "";
        let res, res1;
        res = fs.readFileSync(fullpath);
        res1 = JSON.parse(res);
        data = finalmessage(res1, request);
        return data;
    }
    else {

        return makeRequest(request[0]).then(res1 => {
            var fs = require('fs');
            var str = JSON.stringify(res1);
            fs.writeFile(fullpath, str, function (err) {
                if (err) throw err;
            });
            var data = "";
            data = finalmessage(res1, request);
            return data;
        }).catch(error => console.log(''));

    }

}
//Build final message that will appear to client
function finalmessage(res1, request) {
    var data = "";
    data = "{";
    for (var x = 1; x < request.length; x++) {
        data += statefunction(request[x], res1);
        if (x >= 1 && x != request.length - 1) { data += ' ,'; }
    }
    data += "}"
    return data;
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
function getcitytemperature(data) {

    const temp = data.main.temp;
    const city = data.name;
    const res = 'Temperature = ' + temp + ' K in ' + city + ' now';
    console.log(res);
    return temp;
};

function getcityhumidity(data) {

    const humidity = data.main.humidity;
    const city = data.name;
    const res = 'Humidity = ' + humidity + ' in ' + city + ' now';
    console.log(res);
    return humidity;

};

function getcountryname(data) {

    const name = data.sys.country;
    const city = data.name;
    const res = 'Country name of ' + city + ' is ' + name;
    console.log(res);
    return name;

};


function getwindspeed(data) {

    const speed = data.wind.speed;
    const city = data.name;
    const res = 'Wind speed in ' + city + ' is ' + speed;
    console.log(res);
    return speed;

};


function getwinddegree(data) {

    const degree = data.wind.deg;
    const city = data.name;
    const res = 'Wind degree in ' + city + ' is ' + degree;
    console.log(res);
    return degree;

};

//convert temperature unit from Kelvin to Celsius
function KelvinToCelsius(Kelvintemperature) {
    Celsiustemperature = (Kelvintemperature - 273.15).toPrecision(4);
    return Celsiustemperature;
};


function getcitywindinfo(data) {

    const windspeed = getwindspeed(data);
    const winddegree = getwinddegree(data);
    const city = response.data.name;
    const res = 'Wind speed in ' + city + ' is ' + windspeed + ' ,Wind degree is ' + winddegree;
    console.log(res);
    return res;

};

//get temperature in kelvin then convert it to celsius
//then return result
function getcitytemperatureToCelsius(data) {

    const Kelvintemperature = getcitytemperature(data);
    const Celsiustemperature = KelvinToCelsius(Kelvintemperature);
    const city = data.name;
    console.log('Temperature = ' + Celsiustemperature + ' °C in ' + city + ' now');
    return Celsiustemperature;

};

//Function to be tested in test.js  
exports.makeRequest = makeRequest;
exports.parseUrl = parseUrl;
exports.handleradapter = handleradapter;
exports.responsehandler = responsehandler;
exports.finalmessage = finalmessage;
exports.getinfo = getinfo;
exports.statefunction = statefunction;
exports.getcitytemperature = getcitytemperature;
exports.getcityhumidity = getcityhumidity;
exports.getcountryname = getcountryname;
exports.getwindspeed = getwindspeed;
exports.getwinddegree = getwinddegree;
exports.KelvinToCelsius = KelvinToCelsius;
exports.getcitywindinfo = getcitywindinfo;
exports.getcitytemperatureToCelsius = getcitytemperatureToCelsius;
