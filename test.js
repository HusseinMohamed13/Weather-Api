//const api = require('./Api.js')
/*
it('get country name of city London', () => {
  api.getcountryname().then(res=>{
    assert.equal(res,'GB');
  }).catch(error => console.log('Error', error));
})
*/

const m = require('./module.js')
const assert = require('assert')



/*Unit Testing*/

it('get weather description of city London', () => {
  assert.equal(m.getcityweatherdescription(), 'overcast clouds');
})

it('get weather id of city London', () => {
  assert.equal(m.getcityweatherid(), 804);
})

it('get temperature of city London', () => {
  assert.equal(m.getcitytemperature(), 283.32);
})

it('get humidity of city London', () => {
  assert.equal(m.getcityhumidity(), 71);
})

it('get system id of city London', () => {
  assert.equal(m.getsystemid(), 1414);
})

it('get country name of city London', () => {
  assert.equal(m.getcountryname(), 'GB');
})

it('get wind speed of city London', () => {
  assert.equal(m.getwindspeed(), 6.2);
})

it('get wind degree of city London', () => {
  assert.equal(m.getwinddegree(), 200);
})

it('convert temperature from Kelvin to Celsius', () => {
  assert.equal(m.KelvinToCelsius(283.32), 10.17);
})

/*********************/
/*Integration Testing*/

it('get weather of city London', () => {

  assert.equal(m.getcityweather(), 'weather description is ' + 'overcast clouds' + ' ,weather id is ' + 804);

})

it('get wind info of city London', () => {

  assert.equal(m.getcitywindinfo(), 'Wind speed in London is ' + 6.2 + ' ,Wind degree is ' + 200);

})

it('get temperature of city London in Celsius', () => {

  assert.equal(m.getcitytemperatureToCelsius(), 10.17);

})

/**********************/

