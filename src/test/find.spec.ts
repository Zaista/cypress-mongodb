import * as assert from 'assert';
import { createCollection, dropCollection } from '../utils/collection.js';
import { insertMany } from '../utils/insert.js';
import { MongoDetails } from '../index';
import { findMany, findOne } from '../utils/find';

const default_args: MongoDetails = {
  uri: 'mongodb://localhost:27017',
  collection: 'find_collection',
  database: 'find_database',
  pipeline: { id: 1 },
};

describe('Find tests', () => {
  before(async () => {
    await dropCollection(default_args).catch((err) => {
      if (err.toString().includes('MongoServerError: ns not found')) {
        // ok, collection doesn't exist
      } else {
        throw err;
      }
    });
    await createCollection(default_args);
    const args: MongoDetails = {
      uri: default_args.uri,
      collection: default_args.collection,
      database: default_args.database,
      pipeline: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }],
    };
    await insertMany(args);
  });

  it('Should find one document', async () => {
    const find_document = { id: 1 };
    await findOne(default_args)
      .then((res) => {
        assert.equal(res!.id, find_document.id);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should find many documents', async () => {
    await findMany(default_args)
      .then((res) => {
        assert.equal(res.length, 4);
      })
      .catch((err) => {
        throw err;
      });
  });
});
