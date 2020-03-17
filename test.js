/*info of LONDON*///static object for testing
response = {
  data: {
    coord: { lon: -0.13, lat: 51.51 },
    weather:
    {
      id: [804, 5]
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

const m = require('./Api.js')
const assert = require('assert')

/*
it('get country name of city ', () => {//need internet connection to be tested
    m.makeRequest('LONDON').then(res=>{
    assert.equal(m.getcountryname(res),'GB');
  }).catch(error => console.log('Error', error));
})
*/

/*Unit Testing*/

it('parse url that client of API entered and expected specific city', () => {
  const city = m.parseUrl('/country/?city=Cairo&info=countryname,temp,humidity')[0];
  console.log("Actual city: " + city + "  Expected city: Cairo");
  assert.equal(city, 'Cairo');
})

it('parse url that client of API entered and expected specific info', () => {
  const info = m.parseUrl('/country/?city=Cairo&info=countryname,temp,humidity')[1];
  console.log("Actual info: " + info + "  Expected info: countryname");
  assert.equal(info, 'countryname');
})

it('parse url that client of API entered and expected specific info', () => {
  const info = m.parseUrl('/country/?city=Cairo&info=countryname,temp,humidity')[2];
  console.log("Actual info: " + info + "  Expected info: temp");
  assert.equal(info, 'temp');
})

it('parse url that client of API entered and expected specific info', () => {
  const info = m.parseUrl('/country/?city=Cairo&info=countryname,temp,humidity')[3];
  console.log("Actual info: " + info + "  Expected info: humidity");
  assert.equal(info, 'humidity');
})
//Test that getcitytemperature() extract the right info from response object
it('get temperature of city ', () => {
  assert.equal(m.getcitytemperature(response), 283.32);
})
//Test that getcitythumidity() extract the right info from response object
it('get humidity of city ', () => {
  assert.equal(m.getcityhumidity(response), 71);
})
//Test that getcountryname() extract the right info from response object
it('get country name of city ', () => {
  assert.equal(m.getcountryname(response), 'GB');
})
//Test that getwindspeed() extract the right info from response object
it('get wind speed of city ', () => {
  assert.equal(m.getwindspeed(response), 6.2);
})
//Test that getwinddegree() extract the right info from response object
it('get wind degree of city ', () => {
  assert.equal(m.getwinddegree(response), 200);
})
//Test that KelvinToCelsius() convert from Kelvin to Celsius right
it('convert temperature from Kelvin to Celsius', () => {
  assert.equal(m.KelvinToCelsius(283.32), 10.17);
})

/*********************/
/*Integration Testing*/
//Test interact between getcitywindinfo() ,getwindspeed() and getwinddegree()
//where getcitywindinfo() depend on getwindspeed() and getwinddegree() return info
it('get wind info of city ', () => {

  assert.equal(m.getcitywindinfo(response), 'Wind speed in London is ' + 6.2 + ' ,Wind degree is ' + 200);

})
//Test interact between  getcitytemperatureToCelsius() ,getcitytemperature() and KelvinToCelsius()
//where  getcitytemperatureToCelsius() depend on KelvinToCelsius() return info
//and  KelvinToCelsius() depend on getcitytemperature() return info
it('get temperature of city in Celsius', () => {

  assert.equal(m.getcitytemperatureToCelsius(response), 10.17);

})
//Test interact between statefunction() and getcitytemperature() ,getwindspeed() ,getwinddegree() ,getcountryname() ,getcityhumidity()
//Where statefunction() depend on returned info of these functions
it("get specific info from response object", () => {

  const request = 'Countryname';
  const info = m.statefunction(request, response);
  console.log("Actual info: " + info + "  Expected info: Country name: GB");
  assert.equal(info, 'Country name: GB');

})
/**********************/