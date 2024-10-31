import { importDataTask } from "../thirdParty/crimeData/importDataTasks.js";

import cron from 'node-cron';

const fetchCrimeDataTask = cron.schedule('0 0 28 * *', () => {
    console.log('Start crime data cron job on the 28th of every month at midnight');
    try {
        importDataTask();
      } catch (error) {
        console.error("Error in fetching crime data:", error);
      } 
});


  
export default fetchCrimeDataTask;