import axios from 'axios';

const PostRequests = {
    async createPost (token, data) {
        const headers = {
            'Authorization': 'JWT ' + token
        };
        const response = await axios.post(process.env.API_BASE_URL + 'posts/create', data, {headers : headers});
        return response
    },

    async getPosts (token) {
        const headers = {
            'Authorization': 'JWT ' + token
        };
        const response = await axios.get(process.env.API_BASE_URL + 'posts/all', {headers : headers});
        return response
    }
}

export default PostRequests;