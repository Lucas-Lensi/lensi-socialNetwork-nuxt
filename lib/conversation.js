import axios from 'axios';

const PostRequests = {
    async createConversation (token, data) {
        const headers = {
            'Authorization': 'JWT ' + token
        };
        const response = await axios.post(process.env.API_BASE_URL + 'conversations/create', data, {headers : headers});
        return response
    },

    async getConversationsByUser (token) {
        const headers = {
            'Authorization': 'JWT ' + token
        };
        const response = await axios.get(process.env.API_BASE_URL + 'conversations/user', {headers : headers});
        return response
    }
}

export default PostRequests;