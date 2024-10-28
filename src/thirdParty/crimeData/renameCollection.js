import {
  renameCollection,
  dropCollection,
} from "../../utils/db/collectionOperator.js";
import {
  connectToDatabase,
  closeDatabaseConnection,
} from "../../utils/db/dbConn.js";
import mongoose from "mongoose";

import {
  crimedata_tmp_collection_name,
  crimedata_backup_coolection_name,
  crimedata_main_collection_name,
} from "../../utils/db/tableNameConst.js";

export const renameCrimeDataCollection = async () => {
  try {
    await connectToDatabase();
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database is not connected");
    }
    await dropCollection(crimedata_backup_coolection_name);
    await renameCollection(
      crimedata_main_collection_name,
      crimedata_backup_coolection_name
    );
    await renameCollection(
      crimedata_tmp_collection_name,
      crimedata_main_collection_name
    );
  } catch (error) {
    console.error("Error in processing:", error);
    throw error;
  }
};

async function main() {
  try {
    await renameCrimeDataCollection();
  } catch (error) {
    console.error("Error in processing:", error);
  } finally{
    await closeDatabaseConnection();
  }
}

main();
