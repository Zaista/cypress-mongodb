import * as assert from 'assert';
import { createCollection, dropCollection } from '../utils/collection.js';

const default_args: Connection = {
  uri: 'mongodb://localhost:27017',
  collection: 'random_collection',
  database: 'random_database',
};

describe('Collection tests', () => {
  before(async () => {
    await dropCollection(default_args).catch((err) => {
      if (err.toString().includes('MongoServerError: ns not found')) {
        // ok, collection doesn't exist
      } else {
        throw err;
      }
    });
  });

  it('Should fail with missing uri error', async () => {
    const args = { uri: '', database: '', collection: '' };
    await createCollection(args)
      .then(() => {
        throw new Error('Should fail with missing uri error');
      })
      .catch((err) => {
        assert.match(
          err.toString(),
          /Missing MONGODB_URI environment variable/
        );
      });
  });

  it('Should create new collections', async () => {
    await createCollection(default_args).then((res) => {
      assert.equal(res, 'Collection created');
    });
  });

  it('Should fail creating existing collection', async () => {
    await createCollection(default_args)
      .then(() => {
        throw new Error('Should fail with collection already exists error');
      })
      .catch((err) => {
        assert.match(
          err.toString(),
          /MongoServerError: Collection already exists/
        );
      });
  });

  it('Should drop created collection', async () => {
    await dropCollection(default_args).then((res) => {
      assert.equal(res, 'Collection dropped');
    });
  });
});
