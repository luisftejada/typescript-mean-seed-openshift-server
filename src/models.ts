/// <reference path="../typings/index.d.ts" />
import { Config } from './config';
import * as mongoose from 'mongoose';

let db = Config.db;

// The standar part of User -------------------------

export interface IUser {
    id?: string,
    name: string,
    password: string
}

export class BaseUser implements IUser {
  name: string;
  password: string;

  constructor(data:IUser={name: "", password: ""}) {
    this.name = data.name || "";
    this.password = data.password || "";
  }
}

export class User extends BaseUser {
  id: string;
  constructor(data: IUser={name: "", password: ""}) {
    super(data);
  }
  getId(): string {
    return this.id;
  }
  setData(data: IUser) {
    this.id = data.id || this.id || "";
    this.name = data.name || this.name || "";
    this.password = data.password || this.password || "";
  }
  toObj(): any {
    return {
      id: this.id,
      name: this.name,
      password: this.password
    }
  }
  toString(): string {
    return JSON.stringify(this.toObj());
  }
}

// The Mongoose part of User -----------------------------
let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

export interface UserDoc extends BaseUser, mongoose.Document {};

export const Users: mongoose.Model<any> = db.model<UserDoc>('Users',
  userSchema);

export const toUser = (userDoc: UserDoc): User => {
  let newUser = new User();
  for (let p in newUser) {
    newUser[p] = userDoc[p];
  }
  return newUser;
}

export const createUser = (newUser: IUser, callback:any) => {
  let baseUser = new BaseUser(newUser);
  Users.create(baseUser, (err, created_user: UserDoc) => {
    if (err) { callback(err) }
    let newUser = toUser(created_user);
    callback(null, newUser)
  })
}
