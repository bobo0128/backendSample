import mongoose from 'mongoose';
import { crimedata_main_collection_name } from '../utils/db/tableNameConst';

const crimeDataTmpSchema  = new mongoose.Schema({
    community: {
        type: String,
        required: true,
        trim: true,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
      crime_count: {
        type: Number,
        required: true,
        min: 0, // Crime counts should logically be non-negative
      },
      year: {
        type: Number,
        required: true,
        min: 1900,
      },
      month: {
        type: String,
        required: true,
        trim: true,
        enum: [
          '1', '2', '3', '4', '5', '6', 
          '7', '8', '9', '10', '11', '12'
        ], // Ensures only valid month are allowed
      },

}, {collection: crimedata_main_collection_name}
    
);

export default mongoose.model(crimedata_main_collection_name, crimeDataTmpSchema);