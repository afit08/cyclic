const axios = require('axios');
require('dotenv').config();

const province = async (req, res) => {
    try {
        // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api.rajaongkir.com/starter/province',
          headers: { 
            'key': '65358a6c1fa088be3b6fa599a7b1d0ea'
          }
        };
        
        const response = await axios(config);
        // console.log(response.rajaongkir.results);
        const result = response.data.rajaongkir.results;
        // console.log(result);
    return res.status(200).json({
        message: "Get All Province",
        data: result
    })
        
    } catch (error) {
    
    return res.status(404).json({
        message: error.message
    })

    }
}

export default {
    province
}