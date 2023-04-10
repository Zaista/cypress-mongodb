import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

const deletion_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'deletion_collection',
  database: 'deletion_database',
  pipeline: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }],
};
describe(
  'Deletion tests',
  {
    env: {
      mongodb: {
        uri: deletion_data.uri,
        database: deletion_data.database,
        collection: deletion_data.collection,
      },
    },
  },
  () => {
    before(() => {
      cy.insertMany(deletion_data.pipeline);
    });

    describe('deleteOne', () => {
      it('Should delete one document', () => {
        const pipeline = { id: 1 };
        cy.deleteOne(pipeline).then((result: any) => {
          assert.match(result, /1 document deleted/);
        });
      });

      it('Should support deletion using _id', () => {
        const _id = new ObjectId();
        const data = { _id: _id, value: 'value' };
        const filter = { _id: _id };
        cy.insertOne(data);
        cy.deleteOne(filter).then((result: any) => {
          assert.match(result, /1 document deleted/);
        });
      });

      it('Should delete 0 documents', () => {
        const pipeline = { id: 'non existing' };
        cy.deleteOne(pipeline).then((result: any) => {
          assert.match(result, /0 document deleted/);
        });
      });

      it('Should fail deleting one document - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Filter must be an object')) return;
          throw error;
        });
        const pipeline = [{ id: 1 }];
        cy.deleteOne(pipeline).then(() => {
          throw new Error('Should fail with pipeline must be an object error');
        });
      });

      it('Should fail deleting one document - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Filter must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.deleteOne().then(() => {
          throw new Error('Should fail with pipeline must be specified error');
        });
      });
    });

    describe('deleteMany', () => {
      it('Should delete many documents', () => {
        const pipeline = { id: 1 };
        cy.deleteMany(pipeline).then((result: any) => {
          assert.match(result, /3 documents deleted/);
        });
      });

      it('Should support multiple deletion using _id', () => {
        const _id = new ObjectId();
        const _id2 = new ObjectId();
        const data = [
          { id: _id, value: 'value' },
          { id: _id, value: 'value' },
          { id: _id2, value: 'value' },
        ];
        const filter = { id: _id };
        cy.insertMany(data);
        cy.deleteMany(filter).then((result: any) => {
          assert.match(result, /2 documents deleted/);
        });
      });

      it('Should fail deleting many documents - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Filter must be an object')) return;
          throw error;
        });
        const pipeline = [{ id: 1 }];
        cy.deleteMany(pipeline).then(() => {
          throw new Error('Should fail with pipeline must be an object error');
        });
      });

      it('Should fail deleting many documents - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Filter must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.deleteMany().then(() => {
          throw new Error('Should fail with pipeline must be specified error');
        });
      });
    });
  }
);
