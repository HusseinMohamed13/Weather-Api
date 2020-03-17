//Function responsible to get info of specific city from public API
async function makeRequest(city) {
    const axios = require('axios');

       const key = 'c544f992a7963efe309415b840747537';
       let response = await axios.get('http://api.openweathermap.org/data/2.5/weather',{
       params: {
       q: city,
       appid : key
       }
    })

    return response;
}


var http = require('http');

http.createServer(handleradapter(getinfo)).listen(8080);

function handleradapter(getinfo) {
    return function (req, res) {
        parsedRequest = requesthandler(req);
        responsehandler(res,getinfo,parsedRequest);
    }
}

//Function responsible to handle client request 
function requesthandler(req) {
    parsedRequest = parseUrl(req);
    return parsedRequest;
}

function parseUrl(req) {
    
    var msg = req.url;// "/country/?city=Cairo&info=weather,temp"
    var count = 0;
    var str = "";
    var city = "";
    var info = "";
    //get city name
    for(var x=0;x<msg.length;x++){
       if(msg[x]!='?'){
           count++;
       }else {
           break;
       }
    }
    for(var x=count;x<msg.length;x++){
        str+=msg[x];
    } 
    var flag = 0;
    for(var x=0;x<str.length;x++){
        if(flag == 0 ||flag == 2){
            if(flag == 2){
                city+=str[x];
            }
            if(str[x]=='='){
                flag = 2;
            }
           
        }
        if(flag == 1 || flag==3){
            if(flag == 3){
                info+=str[x];
            }
            if(str[x]=='='){
                flag = 3;
            }
           
        }
        if(str[x+1]=='?'){ flag = 0}
        if(str[x+1]=='&'){ flag = 1}
    }  
    var requested = [];
    var str1 = city+','+info;
    requested = str1.split(',');
    
    return requested;
}
//Function responsible to get response from public API and send it to client 
const responsehandler =(res,getinfo,parsedRequest)=> {

    getinfo(parsedRequest).then(function(result){//to solve promise
    var res1 = result;
    res.end(res1);
    });
    
}

function getinfo(request) {
    return makeRequest(request[0]).then(res1 => {
        var temp = getcitytemperature(res1);
        var name = getcountryname(res1);
        var data = "temp  = " + temp + " K in "+request[0]+" ,country name of city " +request[0]+" is " +name ;
        return data;
    }).catch(error => console.log(''));

}

function getfakeinfo(city){
    return re.data.main.temp;
}

/*************/

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


function getcitytemperatureToCelsius(response) {

    const Kelvintemperature = getcitytemperature(response);
    const Celsiustemperature = KelvinToCelsius(Kelvintemperature);
    const city = response.data.name;
    console.log('Temperature = ' + Celsiustemperature + ' °C in ' + city + ' now');
    return Celsiustemperature;

};


exports.getcitytemperature = getcitytemperature;
exports.getcityhumidity = getcityhumidity;
exports.getcountryname = getcountryname;
exports.getwindspeed = getwindspeed;
exports.getwinddegree = getwinddegree;
exports.KelvinToCelsius = KelvinToCelsius;
exports.getcitywindinfo = getcitywindinfo;
exports.getcitytemperatureToCelsius = getcitytemperatureToCelsius;

/*info of LONDON*/
re = {
    data: {
    coord: { lon: -0.13, lat: 51.51 },
    weather:
    {
        id: [804,5]
        ,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d'
    }
    ,
    base: 'stations',
    main: {
        temp: 283.32,
        feels_like: 277.89,
        temp_min: 282.04,
        temp_max: 284.26,
        pressure: 1007,
        humidity: 71
    },
    visibility: 10000,
    wind: { speed: 6.2, deg: 200 },
    clouds: { all: 90 },
    dt: 1584268507,
    sys: {
        type: 1,
        id: 1414,
        country: 'GB',
        sunrise: 1584252833,
        sunset: 1584295494
    },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200
   }
  }