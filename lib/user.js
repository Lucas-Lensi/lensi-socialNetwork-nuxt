import axios from 'axios';

const UserRequests = {

    async login (user) {
        await console.log(process.env.API_BASE_URL);
        const response = await axios.post(process.env.API_BASE_URL + 'users/login', user);
        return response
    },

    async createUser (data) {
        const response = await axios.post(process.env.API_BASE_URL + 'users/create', data);
        return response
    },

    async getUserForPost (token, id) {
        const headers = {
            'Authorization': 'JWT ' + token
        }
        const response = await axios.get(process.env.API_BASE_URL + 'users/post/' + id, {headers: headers});
        return response
    }

}

export default UserRequests;