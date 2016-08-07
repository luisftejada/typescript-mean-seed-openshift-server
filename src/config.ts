/// <reference path="../typings/index.d.ts" />
import * as mongoose from "mongoose";
let secret = 't01s 1s sup3r_sup3R s3cr3tttt {!@~!!!}';

export interface IConfig {
  SEED_MODE: boolean;
  SEED_URI: string;
  db: mongoose.Mongoose;
}

let SEED_MODE = process.env.SEED_MODE || "prod";
let SEED_URI = process.env.SEED_URI || "undefined"
let SUPER_SECRET = process.env.SUPER_SECRET || secret;

if ( SEED_MODE === "dev") {
  SEED_URI = process.env.SEED_URI_DEV || "undefined"
}
if ( SEED_MODE === "prod") {
  SEED_URI = process.env.SEED_URI_PROD || "undefined"
}


if ( SEED_URI === "undefined" ) {
  let error = "You need to define the ENVIRONMENT variable SEED_URI";
  console.log(error);
  throw new Error(error);
}
console.log({MODE: SEED_MODE, URI:SEED_URI})
console.log('connecting to mongodb on ',SEED_URI)
mongoose.connect(SEED_URI);

export const Config = {
  SUPER_SECRET: SUPER_SECRET,
  SEED_MODE: SEED_MODE,
  SEED_URI: SEED_URI,
  db: mongoose
}
