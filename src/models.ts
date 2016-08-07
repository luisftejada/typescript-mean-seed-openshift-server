/// <reference path="../typings/index.d.ts" />
import { Config } from './config';
import * as mongoose from 'mongoose';

let db = Config.db;

// The standar part of User -------------------------

export interface IUser {
    id?: string,
    name: string,
    email: string,
    password: string
}

export class BaseUser implements IUser {
  name: string;
  password: string;
  email: string;

  constructor(data:IUser={email: "", name: "", password: ""}) {
    this.name = data.name || "";
    this.password = data.password || "";
    this.email = data.email || "";
  }
}

export class User extends BaseUser {
  id: string;
  constructor(data: IUser={id: null, name: "", email:"", password: ""}) {
    super(data);
  }
  getId(): string {
    return this.id;
  }
  setData(data: IUser) {
    this.id = data.id || this.id || "";
    this.name = data.name || this.name || "";
    this.email = data.email || this.email || "";
    this.password = data.password || this.password || "";
  }
  toObj(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
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
  password: { type: String, required: true },
  email: { type: String, required: true },
});

export interface UserDoc extends BaseUser, mongoose.Document {};

export const Users: mongoose.Model<any> = db.model<UserDoc>('Users',
  userSchema);

export const toUser = (userDoc: UserDoc): User => {
  let newUser = new User();
  for (let p in newUser) {
    newUser[p] = userDoc[p];
  }
  newUser['id'] = userDoc['_id'].toHexString();
  return newUser;
}

let _createUser = (newUser: IUser, callback:any) => {
  let baseUser = new BaseUser(newUser);
  Users.create(baseUser, (err, created_user: UserDoc) => {
    if (err) { callback(err) }
    let newUser = toUser(created_user);
    callback(null, newUser)
  })
}

export const createUser = (baseUser: BaseUser) => {
  return new Promise<User>((resolve, reject) => {
    console.log("creating user: ", baseUser)
    // Check if the user already exists
    Users.findOne({email: baseUser.email}, (err, user) => {
      if (!user) {
        // ok, no user, so lets create it
        Users.create(baseUser, (err, created_user: UserDoc) => {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            resolve(toUser(created_user));
          }
        })
      } else {
        // user already exists
        reject({message: `User ${baseUser.email} already exists`});
      }
    })
  })
}

export const getUsers = () => {
  // Get all users in the database
  return new Promise<Array<User>>((resolve, reject) => {
    Users.find({}, (err, users:Array<UserDoc>) => {
      if (err) { reject(err); }
      resolve(users.map((userDoc) => toUser(userDoc)))
    });
  })
}
