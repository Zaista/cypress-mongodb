import * as assert from 'assert';
import { createCollection, dropCollection } from '../utils/collection.js';
import {insertOne, insertMany} from "../utils/insert.js";

const default_args: Connection = {
  uri: 'mongodb://localhost:27017',
  collection: 'insert_collection',
  database: 'insert_database',
  pipeline: {id: 1}
};

describe('Insert tests', () => {

    before(async () => {
      await dropCollection(default_args).catch((err) => {
        if (err.toString().includes('MongoServerError: ns not found')) {
          // ok, collection doesn't exist
        } else {
          throw err;
        }
      });
      await createCollection(default_args);
    });
  

    it('Should insert one document', async () => {
        await insertOne(default_args).then(res => {
            assert.match(res, /1 document inserted: /);
        }).catch(err => {
            throw err;
        });
    });

    it('Should fail inserting more documents', async () => {
        const args = {
            uri: default_args.uri,
            database: default_args.database,
            collection: default_args.collection,
            pipeline: [{id: 1}, {id: 2}]
        }
        await insertOne(args).then(() => {
            throw new Error('Should fail inserting more documents');
        }).catch(err => {
            assert.match(err.toString(), /Error: Pipeline must be an object/);
        });
    });

    it('Should insert many documents', async () => {
        const args = {
            uri: default_args.uri,
            database: default_args.database,
            collection: default_args.collection,
            pipeline: [{id: 1}, {id: 2}, {id: 3}]
        }
        await insertMany(args).then(res => {
            assert.match(res, /3 documents inserted/);
        }).catch(err => {
            throw err;
        });
    });

    it('Should fail inserting single document', async () => {
        await insertMany(default_args).then(() => {
            throw new Error('Should fail inserting single document');
        }).catch(err => {
            assert.match(err.toString(), /Error: Pipeline must be an array/);
        });
    });
});