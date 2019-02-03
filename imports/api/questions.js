import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('Questions');
export const Options = new Mongo.Collection('Options');
