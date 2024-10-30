import mongoose from "mongoose";
import { cityboundary_tmp_collection_name } from "../utils/db/tableNameConst.js";


const cityBoundarySchema = new mongoose.Schema({
  properties: {
    comm_structure: String,
    name: String,
    sector: String,
    class_code: String,
    created_dt: Date,
    srg: String,
    class: String,
    comm_code: String,
    modified_dt: Date,
  },
  geometry: {
    type: {
      type: String, // 'MultiPolygon' in your data
      enum: ['MultiPolygon'],
      required: true,
    },
    coordinates: {
      type: [[[Array]]], // Array of arrays of arrays of numbers
      required: true,
    },
  }
}, {collection: cityboundary_tmp_collection_name});

const CityBoundary = mongoose.model(cityboundary_tmp_collection_name, cityBoundarySchema);
export default CityBoundary;

