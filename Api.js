
async function makeRequest(city) {
    const axios = require('axios');

    const config = {
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=+' + city + '&appid=c544f992a7963efe309415b840747537'
    }

    let res = await axios(config)
    console.log('info for London is')
    console.log(res.data);
    return res

}
/*
function getcityinfo(){
    makeRequest('LONDON')
};*/
makeRequest('LONDON');

//getcityinfo();