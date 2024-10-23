import fetch from 'node-fetch';
import { externalURL } from '../utils/constants.js';


export const fetchDataFromAPI = async(page, limit) => {
    try{
        const url = generateURL(page, limit);
        console.log(url);
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Error while fetching data from external api: "+ response.statusText);
        }

        const data = await response.json();
        return data;

    }catch(error) {
        console.log("Error fetching data:",error);
    }
}

const generateURL = (page, limit) => {
    let fetchURL = process.env.externalURL || externalURL;
    console.log(fetchURL);
    if(page && limit) {
        fetchURL += "?$offset="+page+"&$limit="+limit;
    }
    
    return fetchURL;
}