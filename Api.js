
async function makeRequest(co) {
    const axios = require('axios');
   
    const config = {
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=+'+co+'&appid=c544f992a7963efe309415b840747537'   
    }

    let res = await axios(config)
    return res
    
}

const getcountryname = ()=>{
    
    return makeRequest('LONDON').then(res => {
        const name = res.data.sys.country;
        console.log('Country name of London is '+name);
        return name;
     });
     
};

exports.getcountryname = getcountryname;