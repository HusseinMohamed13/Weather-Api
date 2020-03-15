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
  assert.equal(m.getcityweatherdescription(),'overcast clouds');
})

it('get weather id of city London', () => {
  assert.equal(m.getcityweatherid(),804);
})

it('get temperature of city London', () => {
  assert.equal(m.getcitytemperature(),283.32);
})

it('get humidity of city London', () => {
  assert.equal(m.getcityhumidity(),71);
})

it('get system id of city London', () => {
  assert.equal(m.getsystemid(),1414);
})

it('get country name of city London', () => {
  assert.equal(m.getcountryname(), 'Egypt');
})
it('get wind speed of city London', () => {
  assert.equal(m.getwindspeed(), 6.2);
})

it('get wind degree of city London', () => {
  assert.equal(m.getwinddegree(), 200);
})
it('get weather of city London', () => {

  assert.equal(m.getcityweather(), 'weather description is ' + 'overcast clouds' + ' ,weather id is ' + 804);

})
/*******/
