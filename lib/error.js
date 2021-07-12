import axios from 'axios';

const ErrorRequests = {
    async postErrorLog (error) {
        const response = await axios.post(process.env.API_BASE_URL + 'errors', error);
        return response
    }
}

export default ErrorRequests;