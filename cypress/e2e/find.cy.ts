import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

const finding_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'finding_collection',
  database: 'finding_database',
  pipeline: [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }],
};
describe(
  'Finding tests',
  {
    env: {
      mongodb: {
        uri: finding_data.uri,
        database: finding_data.database,
        collection: finding_data.collection,
      },
    },
  },
  () => {
    before(() => {
      cy.insertMany(finding_data.pipeline);
    });

    describe('findOne', () => {
      it('Should find one document', () => {
        const query = { id: 1 };
        cy.findOne(query).then((result: any) => {
          assert.strictEqual(result.id, query.id);
        });
      });

      it('Should fine one document using ObjectId', () => {
        const _id = new ObjectId(
          faker.datatype.hexadecimal({ length: 24 }).substring(2)
        );
        const document = { _id: _id, test: 'test' };
        cy.insertOne(document);
        cy.findOne({ _id: _id }).then((result) => {
          assert.strictEqual(result.test, document.test);
          assert.isTrue(result._id.equals(document._id));
        });
      });

      it('Should find no document', () => {
        const query = { id: 4 };
        cy.findOne(query).then((result) => {
          assert.isNull(result);
        });
      });

      it('Should fail finding one document - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Query must be a valid mongodb query object')
          )
            return;
          throw error;
        });
        const query = [{ id: 1 }];
        cy.findOne(query).then(() => {
          throw new Error('Should fail with query must be valid error');
        });
      });

      it('Should fail finding one document - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Query must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.findOne().then(() => {
          throw new Error('Should fail with query must be specified error');
        });
      });
    });

    describe('findMany', () => {
      it('Should find many documents', () => {
        const query = { id: 1 };
        cy.findMany(query).then((result: any) => {
          assert.isAbove(result.length, 1);
        });
      });

      it('Should fine many documents using ObjectId', () => {
        const _id = new ObjectId(
          faker.datatype.hexadecimal({ length: 24 }).substring(2)
        );
        const document1 = { _id: _id, test: 'test' };
        const document2 = { test: 'test' };
        cy.insertMany([document1, document2]);
        cy.findMany({ _id: _id }).then((result) => {
          console.log(result);
          assert.equal(result.length, 1);
          assert.strictEqual(result[0].test, document1.test);
          assert.isTrue(result[0]._id.equals(document1._id));
        });
      });

      it('Should find no documents', () => {
        const query = { id: 5 };
        cy.findMany(query).then((result: any) => {
          assert.strictEqual(result.length, 0);
        });
      });

      it('Should fail finding many documents - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Query must be a valid mongodb query object')
          )
            return;
          throw error;
        });
        const query = [{ id: 1 }];
        cy.findMany(query).then(() => {
          throw new Error('Should fail with query must be valid error');
        });
      });

      it('Should fail finding many documents - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Query must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.findMany().then(() => {
          throw new Error('Should fail with query must be specified error');
        });
      });
    });
  }
);
