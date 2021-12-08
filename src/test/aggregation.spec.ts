import * as assert from 'assert';
import {aggregate} from "../utils/aggregation.js";

describe('Aggregation tests', () => {

    it('Should fail with missing uri error', async () => {
        const pipeline = [{$match: {id: 1}}];
        const args = {uri: '', database: '', collection: '', pipeline: pipeline}
        await aggregate(args).then(res => {
            throw new Error('Should fail with missing uri error');
        }).catch(err => {
            assert.match(err.toString(), /Missing MONGODB_URI environment variable/);
        });
    });

    it('Should fail with missing database name error', async () => {
        const pipeline = [{$match: {id: 1}}];
        const args = {uri: 'mongodb://localhost:27017', database: '', collection: '', pipeline: pipeline}
        await aggregate(args).then(res => {
            throw new Error('Should fail with missing database name error');
        }).catch(err => {
            assert.match(err.toString(), /Error: Database not specified/);
        });
    });

    it('Should fail with missing collection name error', async () => {
        const pipeline = [{$match: {id: 1}}];
        const args = {uri: 'mongodb://localhost:27017', database: 'new_database', collection: '', pipeline: pipeline}
        await aggregate(args).then(res => {
            throw new Error('Should fail with missing collection name error');
        }).catch(err => {
            assert.match(err.toString(), /Error: Collection not specified/);
        });
    });

    it('Should pass', async () => {
        const pipeline = [{$match: {id: 1}}];
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'test_collection',
            pipeline: pipeline
        }
        await aggregate(args).then(res => {
            assert.notEqual(res[0], undefined);
            assert.equal(res[0].test, 'It wooorks!');
        });
    });
});