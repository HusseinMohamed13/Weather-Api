/*info of LONDON*/
data = {
    coord: { lon: -0.13, lat: 51.51 },
    weather:
    {
        id: 804,
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
/*********************************/

function getcityweatherdescription() {

    const desc = data.weather.description;
    res = 'Weather description is ' + desc + ' in London now';
    console.log(res);
    return desc;

};


function getcityweatherid() {

    const id = data.weather.id;
    res = 'Weather id = ' + id + ' in London now';
    console.log(res);
    return id;
};


function getcitytemperature() {

    const temp = data.main.temp;
    const res = 'Temperature = ' + temp + ' K in London now';
    console.log(res);
    return temp;
};


function getcityhumidity() {

    const humidity = data.main.humidity;
    const res = 'Humidity = ' + humidity + ' in London now';
    console.log(res);
    return humidity;

};


function getsystemid() {

    const id = data.sys.id;
    const res = 'Systemid of London = ' + id;
    console.log(res);
    return id;

};


function getcountryname() {

    const name = data.sys.country;
    const res = 'Country name of London is ' + name;
    console.log(res);
    return name;

};


function getwindspeed() {

    const speed = data.wind.speed;
    const res = 'Wind speed in London is ' + speed;
    console.log(res);
    return speed;

};


function getwinddegree() {

    const degree = data.wind.deg;
    const res = 'Wind degree in London is ' + degree;
    console.log(res);
    return degree;

};


function KelvinToCelsius(Kelvintemperature) {
    Celsiustemperature = (Kelvintemperature - 273.15).toPrecision(4);
    return Celsiustemperature;
};


function getcityweather() {

    const desc = getcityweatherdescription();
    const id = getcityweatherid();
    const res = 'weather description is ' + desc + ' ,weather id is ' + id;
    console.log(res);
    return res;

};


function getcitywindinfo() {

    const windspeed = getwindspeed();
    const winddegree = getwinddegree();
    const res = 'Wind speed in London is ' + windspeed + ' ,Wind degree is ' + winddegree;
    console.log(res);
    return res;

};


function getcitytemperatureToCelsius() {

    const Kelvintemperature = getcitytemperature();
    const Celsiustemperature = KelvinToCelsius(Kelvintemperature);
    console.log('Temperature = ' + Celsiustemperature + ' °C in London now');
    return Celsiustemperature;

};


exports.getcityweatherdescription = getcityweatherdescription;
exports.getcityweatherid = getcityweatherid;
exports.getcitytemperature = getcitytemperature;
exports.getcityhumidity = getcityhumidity;
exports.getsystemid = getsystemid;
exports.getcountryname = getcountryname;
exports.getwindspeed = getwindspeed;
exports.getwinddegree = getwinddegree;
exports.KelvinToCelsius = KelvinToCelsius;
exports.getcityweather = getcityweather;
exports.getcitywindinfo = getcitywindinfo;
exports.getcitytemperatureToCelsius = getcitytemperatureToCelsius;


