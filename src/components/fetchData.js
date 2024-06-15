// ExampleComponent.js

import { endpoints } from '../constants/endpoints';
import axios from 'axios';

const fetchData = async (endpoint) => {
    var response;
    try {
        const base_url = process.env.REACT_APP_ENV_VALUE === 'local' ? endpoint : `${endpoints.BASE_URL}${endpoint}`;
        console.log("Hitting URL: ", base_url);
        response = await axios.get(base_url);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        return response;
    }
};

export default fetchData;