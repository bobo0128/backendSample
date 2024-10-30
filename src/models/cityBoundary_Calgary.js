import mongoose from "mongoose";
import { cityboundary_main_collection_name } from "../utils/db/tableNameConst";

const multipolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});

const boundarySchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  class_code: {
    type: String,
    required: true,
  },
  comm_code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  srg: {
    type: String,
    required: true,
  },
  comm_structure: {
    type: String,
    required: true,
  },
  created_dt: {
    type: Date,
    required: true,
  },
  modified_dt: {
    type: Date,
    required: true,
  },
  multipolygon: {
    type: multipolygonSchema,
    required: true,
  },
});


export default mongoose.model(cityboundary_main_collection_name, boundarySchema );
