import * as assert from 'assert';
import {createCollection, dropCollection} from "../utils/collection.js";

describe('Collection tests', () => {

    it('Should fail with missing uri error', async () => {
        const args = {uri: '', database: '', collection: ''}
        await createCollection(args).then(res => {
            throw new Error('Should fail with missing uri error');
        }).catch(err => {
            assert.match(err.toString(), /Missing MONGODB_URI environment variable/);
        });
    });

    it('Should create new collections', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'random_database',
            collection: 'random_collection'
        }
        await createCollection(args).then(res => {
            assert.equal(res, 'Collection created');
        });
    });

    it('Should fail creating existing collection', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'random_database',
            collection: 'random_collection'
        }
        await createCollection(args).then(res => {
            throw new Error('Should fail with collection already exists error');
        }).catch(err => {
            assert.match(err.toString(), /MongoServerError: Collection already exists/);
        });
    });

    it('Should drop created collection', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'random_database',
            collection: 'random_collection'
        }
        await dropCollection(args).then(res => {
            assert.equal(res, 'Collection dropped');
        });
    });
});