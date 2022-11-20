const axios = require('axios');

class ApiClass {
    axiosInstance = axios.create({
        baseURL: 'http://188.166.50.33:3000'
    });

    init(serverName) {
        return this
            .axiosInstance
            .post('/init', {serverName})
    }
}

const Api = new ApiClass();
module.exports = Api;
