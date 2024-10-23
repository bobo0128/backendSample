import { Router } from "express";

import {fetchDataFromAPI} from '../services/crimeDataService.js';

const router = Router()


//page and how many records for each page
router.get('/', async(req,res) => {
    debugger
    
    const {page, limit} = req.query;
    console.log("in controller page:"+page+", limit:"+limit);
    const data = await fetchDataFromAPI(page, limit);
    res.status(200).send(data);
});

export default router;