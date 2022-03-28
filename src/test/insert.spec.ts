import * as assert from 'assert';
import { createCollection, dropCollection } from '../utils/collection.js';
import { insertOne, insertMany } from '../utils/insert.js';
import { MongoDetails } from '../index';
import { ObjectId } from 'mongodb';

const default_args: MongoDetails = {
  uri: 'mongodb://localhost:27017',
  collection: 'insert_collection',
  database: 'insert_database',
  pipeline: { id: 1 },
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
    const insert_document = { _id: 'randomId1253', test: 'Some text' };
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: insert_document,
    };
    await insertOne(args)
      .then((res) => {
        assert.equal(res.toString(), insert_document._id);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should fail inserting more documents', async () => {
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: [{ id: 1 }, { id: 2 }],
    };
    await insertOne(args)
      .then(() => {
        throw new Error('Should fail inserting more documents');
      })
      .catch((err) => {
        assert.match(err.toString(), /Error: Pipeline must be an object/);
      });
  });

  it('Should insert many documents', async () => {
    const insert_documents = [
      { _id: 'randomNewId1253', test: 'Some text' },
      { _id: 'rand1253#$%', test: 'Some other text' },
      { _id: 123334, test: 'Some new text' },
    ];
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: insert_documents,
    };
    const expected_result = {
      '0': insert_documents[0]._id,
      '1': insert_documents[1]._id,
      '2': insert_documents[2]._id,
    };
    await insertMany(args)
      .then((res) => {
        assert.deepEqual(res, expected_result);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should fail inserting single document', async () => {
    await insertMany(default_args)
      .then(() => {
        throw new Error('Should fail inserting single document');
      })
      .catch((err) => {
        assert.match(err.toString(), /Error: Pipeline must be an array/);
      });
  });
});
