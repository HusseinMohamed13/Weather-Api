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

exports.getcityweatherdescription = getcityweatherdescription;
exports.getcityweatherid = getcityweatherid;