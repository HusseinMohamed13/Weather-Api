const api = require('./Api.js')
const assert = require('assert')

it('get country name of city London', () => {
    api.getcountryname().then(res=>{
      assert.equal(res,'GB');
    }).catch(error => console.log('Error', error));
  })
  