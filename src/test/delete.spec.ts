import * as assert from 'assert';
import { createCollection, dropCollection } from '../utils/collection.js';
import { deleteMany, deleteOne } from '../utils/delete.js';
import { insertMany } from '../utils/insert.js';
import { MongoDetails } from '../index';

const default_args: MongoDetails = {
  uri: 'mongodb://localhost:27017',
  collection: 'delete_collection',
  database: 'delete_database',
  pipeline: { id: 1 },
};

describe('Delete tests', () => {
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

  it('Should delete one document', async () => {
    await deleteOne(default_args)
      .then((res) => {
        assert.match(res, /1 document deleted/);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should delete 0 document', async () => {
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: { id: 'non existing' },
    };
    await deleteOne(args)
      .then((res) => {
        assert.match(res, /0 document deleted/);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should fail deleting one document', async () => {
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: [{}],
    };
    await deleteOne(args)
      .then(() => {
        throw new Error('Should fail deleting one document');
      })
      .catch((err) => {
        assert.match(err.toString(), /Error: Pipeline must be an object/);
      });
  });

  it('Should delete many documents', async () => {
    await deleteMany(default_args)
      .then((res) => {
        assert.match(res, /3 documents deleted/);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should fail deleting single document', async () => {
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: [{}],
    };
    await deleteMany(args)
      .then(() => {
        throw new Error('Should fail inserting many documents');
      })
      .catch((err) => {
        assert.match(err.toString(), /Error: Pipeline must be an object/);
      });
  });
});
