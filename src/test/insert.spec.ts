import * as assert from 'assert';
import {insertOne, insertMany} from "../utils/insert.js";

describe('Insert tests', () => {

    it('Should insert one document', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: {test: 1}
        }
        await insertOne(args).then(res => {
            assert.match(res, /1 document inserted: /);
        }).catch(err => {
            throw err;
        });
    });

    it('Should fail inserting more documents', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: [{test: 1}, {test: 2}]
        }
        await insertOne(args).then(res => {
            throw new Error('Should fail inserting more documents');
        }).catch(err => {
            assert.match(err.toString(), /Error: Pipeline must be an object/);
        });
    });

    it('Should insert many documents', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: [{test: 1}, {test: 2}, {test: 3}]
        }
        await insertMany(args).then(res => {
            assert.match(res, /3 documents inserted/);
        }).catch(err => {
            throw err;
        });
    });

    it('Should fail inserting single document', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: {test: 1}
        }
        await insertMany(args).then(res => {
            throw new Error('Should fail inserting single document');
        }).catch(err => {
            assert.match(err.toString(), /Error: Pipeline must be an array/);
        });
    });
});