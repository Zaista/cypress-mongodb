import * as assert from 'assert';
import {deleteMany, deleteOne} from "../utils/delete.js";

describe('Delete tests', () => {

    it('Should delete one document', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: {test: 1}
        }
        await deleteOne(args).then(res => {
            assert.match(res, /1 document deleted/);
        }).catch(err => {
            throw err;
        });
    });

    it('Should fail deleting one document', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: [{test: 1}]
        }
        await deleteOne(args).then(res => {
            throw new Error('Should fail deleting one document');
        }).catch(err => {
            assert.match(err.toString(), /Error: Pipeline must be an object/);
        });
    });

    it('Should delete many documents', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: {test: 2}
        }
        await deleteMany(args).then(res => {
            assert.match(res, /documents deleted/);
        }).catch(err => {
            throw err;
        });
    });

    it('Should fail deleting single document', async () => {
        const args = {
            uri: 'mongodb://localhost:27017',
            database: 'test_db',
            collection: 'new_test',
            pipeline: [{test: 1}]
        }
        await deleteMany(args).then(res => {
            throw new Error('Should fail inserting many documents');
        }).catch(err => {
            assert.match(err.toString(), /Error: Pipeline must be an object/);
        });
    });
});