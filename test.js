/*info of LONDON*/
response = {
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

/************************/

var s = 'id';
obj = JSON.stringify (response['data']['weather'][s]);
var str = obj.substring(1,obj.length-1);
console.log("'"+str+"'");
/*var arr = str.split(',');
for(var x=0 ;x<arr.length;x++){
  console.log(arr[x]);
}*/

const m = require('./Api.js')
const assert = require('assert')


/*Unit Testing*/

/*
it('get country name of city ', () => {
    m.makeRequest('LONDON').then(res=>{
    assert.equal(m.getcountryname(res),'GB');
  }).catch(error => console.log('Error', error));
})
*/


it('get temperature of city ', () => {
  assert.equal(m.getcitytemperature(response), 283.32);
})

it('get humidity of city ', () => {
  assert.equal(m.getcityhumidity(response), 71);
})

it('get country name of city ', () => {
  assert.equal(m.getcountryname(response), 'GB');
})

it('get wind speed of city ', () => {
  assert.equal(m.getwindspeed(response), 6.2);
})

it('get wind degree of city ', () => {
  assert.equal(m.getwinddegree(response), 200);
})

it('convert temperature from Kelvin to Celsius', () => {
  assert.equal(m.KelvinToCelsius(283.32), 10.17);
})

/*********************/
/*Integration Testing*/

it('get wind info of city ', () => {

  assert.equal(m.getcitywindinfo(response), 'Wind speed in London is ' + 6.2 + ' ,Wind degree is ' + 200);

})

it('get temperature of city in Celsius', () => {

  assert.equal(m.getcitytemperatureToCelsius(response), 10.17);

})

/**********************/

exports.response = response;