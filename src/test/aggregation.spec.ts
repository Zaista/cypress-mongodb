import * as assert from 'assert';
import { aggregate } from '../utils/aggregation.js';
import { createCollection, dropCollection } from '../utils/collection.js';
import { insertMany } from '../utils/insert.js';
import {MongoDetails} from "../index";

const default_args: MongoDetails = {
  uri: 'mongodb://localhost:27017',
  collection: 'aggregation_collection',
  database: 'aggregation_database',
  pipeline: [{ id: 1, aggregation: 'aggregation_result' }, {id: 2}, {id: 3}],
};

describe('Aggregation tests', () => {
  before(async () => {
    await dropCollection(default_args).catch((err) => {
      if (err.toString().includes('MongoServerError: ns not found')) {
        // ok, collection doesn't exist
      } else {
        throw err;
      }
    });
    await createCollection(default_args);

    await insertMany(default_args);
  });

  it('Should fail with missing uri error', async () => {
    const pipeline = [{ $match: { id: 1 } }];
    const args = { uri: '', database: '', collection: '', pipeline: pipeline };
    await aggregate(args)
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

  it('Should fail with missing database name error', async () => {
    const pipeline = [{ $match: { id: 1 } }];
    const args = {
      uri: default_args.uri,
      database: '',
      collection: default_args.collection,
      pipeline: pipeline,
    };
    await aggregate(args)
      .then(() => {
        throw new Error('Should fail with missing database name error');
      })
      .catch((err) => {
        assert.match(err.toString(), /Error: Database not specified/);
      });
  });

  it('Should fail with missing collection name error', async () => {
    const pipeline = [{ $match: { id: 1 } }];
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: '',
      pipeline: pipeline,
    };
    await aggregate(args)
      .then(() => {
        throw new Error('Should fail with missing collection name error');
      })
      .catch((err) => {
        assert.match(err.toString(), /Error: Collection not specified/);
      });
  });

  it('Should match all documents', async () => {
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: [],
    };
    await aggregate(args).then((res) => {
      assert.notEqual(res, undefined);
      assert.equal(res.length, 3);
    });
  });

  it('Should match specific documents', async () => {
    const pipeline = [{ $match: { id: 1 } }];
    const args = {
      uri: default_args.uri,
      database: default_args.database,
      collection: default_args.collection,
      pipeline: pipeline,
    };
    await aggregate(args).then((res) => {
      assert.notEqual(res[0], undefined);
      assert.equal(res[0].aggregation, 'aggregation_result');
    });
  });
});
