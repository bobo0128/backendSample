import { Router } from "express";

import {fetchDataFromAPI, getCrimeDataByYears} from '../services/crimeDataService.js';

const router = Router()


//page and how many records for each page
// router.get('/', async(req,res) => {   
//     const {page, limit} = req.query;
//     console.log("in controller page:"+page+", limit:"+limit);
//     const data = await fetchDataFromAPI(page, limit);
//     res.status(200).send(data);
// });

export const fetchCrimeDataByYear = async (req, res) => {
    try{
        const yearsParam = req.query.years;
        let yearOrYears;
        if(!yearsParam) {
            return res.status(400).json({ error: 'Year parameter is required'});
        }else if (yearsParam.includes(',')) {
            yearOrYears = yearsParam.split(',').map((year) => parseInt(year.trim(), 10));
        }
    }catch(error){

    }
}

export default router;