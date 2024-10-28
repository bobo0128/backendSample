import {
  crimeDataJsonURL,
  crimeDataCSVURL,
  dataCategory,
  tmpFileFolder,
} from "../../utils/constants.js";
import { getCSVFileName } from "../util.js";

import fetch from "node-fetch";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

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

const downloadCSV = async (count, CSV_download_url) => {
  const url = `${CSV_download_url}${count}`;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(
    __dirname + tmpFileFolder,
    getCSVFileName(dataCategory.CRIMEDATA)
  );

  try {
    console.log("download crimedata url:"+url);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error("Failed to download CSV file " + response.statusText);

    const fileStream = fs.createWriteStream(filePath);
    response.body.pipe(fileStream);

    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => resolve(filePath));
      fileStream.on("error", (error) => reject(error));
    });
  } catch (error) {
    console.error("Error downloading CSV:", error);
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
