import {
  crimeDataJsonURL,
  crimeDataCSVURL,
} from "../../utils/constants.js";

import fetch from "node-fetch";
import { downloadCSV } from "../util.js";

const COUNT_URL = crimeDataJsonURL + "?$select=count(*)";
const DOWNLOAD_URL = crimeDataCSVURL + "?$limit=";

const getCount = async () => {
  try {
    const response = await fetch(COUNT_URL);
    const data = await response.json();
    return parseInt(data[0].count, 10);
  } catch (error) {
    console.error("Error fetching record count:", error);
    throw error;
  }
};

export const getCrimeDataFromAPI = async () => {
  try {
    const recordCount = await getCount();
    console.log(`Record count: ${recordCount}`);
    const filePath = await downloadCSV(recordCount, DOWNLOAD_URL);
    console.log(`CSV downloaded to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("Error in processing:", error);
  }
};

// async function main() {
//   getCrimeDataFromAPI();
// }

// main();
