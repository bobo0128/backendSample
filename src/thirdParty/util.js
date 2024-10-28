import fs from "fs";

export const getCSVFileName = (dataCategory) => {
  const now = new Date();
  return (
    dataCategory +
    "_" +
    now.getFullYear() +
    "_" +
    (now.getMonth() + 1) +
    "_" +
    now.getDate() +
    "_" +
    Date.now() +
    ".csv"
  );
};


// async function main() {
//   try {
//     const filename = getCSVFileName('crimeData');
//     console.log(`Filename: ${filename}`);
//   } catch (error) {
//     console.error("Error in processing:", error);
//   }
// }

// main();



