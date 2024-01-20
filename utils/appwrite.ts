import {Account, Client, Databases,Storage} from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6589877e67fb3f60d9dc');

export const account = new Account(client);
export {ID} from "appwrite";
export const DB=new Databases(client)
export const storage = new Storage(client);
