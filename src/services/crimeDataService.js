import fetch from "node-fetch";
import { externalURL } from "../utils/constants.js";
import crimedata from "../models/crimedata.js";

//pass single year
export const getCrimeDataByYears = async (searchYear) => {
  try {
    const result = await crimedata.aggregate(
      {
        $match: {
          year: searchYear,
        },
      },
      {
        $group: {
          _id: "$community",
          totalCrimeCount: { $sum: '$crime_count' }, // Sum crime_count for each community
        },
      },
      {
        $project: {
          _id: 0,
          community: "$_id",
          totalCrimeCount: 1,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error retriving crime data:", error);
    throw error;
  }
};

//following function is searching result from API directly.
export const fetchDataFromAPI = async (page, limit) => {
  try {
    const url = generateURL(page, limit);
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "Error while fetching data from external api: " + response.statusText
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const generateURL = (page, limit) => {
  let fetchURL = process.env.externalURL || externalURL;
  console.log(fetchURL);
  if (page && limit) {
    fetchURL += "?$offset=" + page + "&$limit=" + limit;
  }

  return fetchURL;
};
