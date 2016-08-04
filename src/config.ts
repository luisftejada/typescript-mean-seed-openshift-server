/// <reference path="../typings/index.d.ts" />
import * as mongoose from "mongoose";

export interface IConfig {
  SEED_MODE: boolean;
  SEED_URI: string;
  db: mongoose.Mongoose;
}

let SEED_MODE = process.env.SEED_MODE || "prod";
let SEED_URI = process.env.SEED_URI || "undefined"
if ( SEED_MODE === "dev") {
  SEED_URI = process.env.SEED_URI_DEV || "undefined"
}

if ( SEED_MODE === "undefined" ) {
  let error = "You need to define the ENVIRONMENT variable SEED_URI";
  console.log(error);
  throw new Error(error);
}

mongoose.connect(SEED_URI);

export const Config = {
  SEED_MODE: SEED_MODE,
  SEED_URI: SEED_URI,
  db: mongoose
}
