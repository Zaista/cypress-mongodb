import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

const finding_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'finding_collection',
  database: 'finding_database',
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
    describe('findOne', () => {
      it('Should find one document', () => {
        const document = { id: faker.string.uuid() };
        cy.insertOne(document);
        const query = { id: document.id };
        cy.findOne(query).then((result: any) => {
          assert.strictEqual(result.id, query.id);
          expect(result.length).to.be.undefined;
        });
      });

      it('Should fine one document using ObjectId', () => {
        const _id = new ObjectId();
        const document = { _id: _id, test: 'test' };
        cy.insertOne(document);
        cy.findOne({ _id: _id }).then((result: any) => {
          assert.strictEqual(result.test, document.test);
          assert.isTrue(result._id.equals(document._id));
        });
      });

      it('Should find no document', () => {
        const query = { id: faker.string.uuid() };
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

    describe('findOneAndUpdate', () => {
      it('Should find one document, update and return updated document', () => {
        const initialDocument = { _id: new ObjectId(), text: 'findOne' };
        cy.insertOne(initialDocument);

        const filter = { _id: initialDocument._id };
        const updatedDocument = { $set: { text: 'findOneAndUpdate' } };
        cy.findOneAndUpdate(filter, updatedDocument, {
          returnDocument: 'after',
        }).then((result: any) => {
          assert.equal(result.text, 'findOneAndUpdate');
        });
      });

      it('Should find one document, update and return original document', () => {
        const initialDocument = {
          _id: new ObjectId(),
          text: 'findOneOriginal',
        };
        cy.insertOne(initialDocument);

        const filter = { _id: initialDocument._id };
        const updatedDocument = { $set: { text: 'findOneAndUpdate' } };
        cy.findOneAndUpdate(filter, updatedDocument).then((result: any) => {
          assert.equal(result.text, 'findOneOriginal');
        });
      });

      it('Should find no document and update using upsert', () => {
        const _id = new ObjectId();
        const document = {
          $set: { test: 'should be upsert using findOneAndUpdate' },
        };
        cy.findOneAndUpdate({ _id: _id }, document, {
          upsert: true,
          returnDocument: 'after',
        }).then((result: any) => {
          console.log(result);
          assert.equal(result.test, 'should be upsert using findOneAndUpdate');
        });
      });
    });

    describe('findOneAndDelete', () => {
      it('Should find one document and delete', () => {
        const uuid = faker.string.uuid();
        const initialDocuments = [
          { uuid: uuid, points: 24 },
          { uuid: uuid, points: 11 },
          { uuid: uuid, points: 15 },
          { uuid: uuid, points: 37 },
          { uuid: uuid, points: 22 },
        ];
        cy.insertMany(initialDocuments);

        const filter = { uuid: uuid };
        cy.findOneAndDelete(filter).then((result: any) => {
          assert.equal(result.points, 24);
        });
      });

      it('Should find one document and delete with sort and projection', () => {
        const uuid = faker.string.uuid();
        const initialDocuments = [
          { uuid: uuid, points: 27 },
          { uuid: uuid, points: 13 },
          { uuid: uuid, points: 18 },
          { uuid: uuid, points: 36 },
          { uuid: uuid, points: 27 },
        ];
        cy.insertMany(initialDocuments);

        const filter = { uuid: uuid };
        cy.findOneAndDelete(filter, {
          sort: { points: 1 },
          projection: { points: 1 },
        }).then((result: any) => {
          assert.equal(result.points, 13);
          expect(result.uuid).to.be.undefined;
        });
      });
    });

    describe('findMany', () => {
      it('Should find many documents', () => {
        const id = faker.string.uuid();
        const documents = [{ id: id }, { id: id }, { id: id }];
        cy.insertMany(documents);
        const query = { id: id };
        cy.findMany(query).then((result: any) => {
          assert.equal(result.length, 3);
        });
      });

      it('Should find many documents with limit', () => {
        const id = faker.string.uuid();
        const documents = [
          { id: id },
          { id: id },
          { id: id },
          { id: id },
          { id: id },
        ];
        cy.insertMany(documents);
        const query = { id: id };
        cy.findMany(query, { limit: 4 }).then((result: any) => {
          assert.equal(result.length, 4);
        });
      });

      it('Should fine many documents using ObjectId', () => {
        const _id = new ObjectId();
        const document1 = { _id: _id, test: 'test' };
        const document2 = { test: 'test' };
        cy.insertMany([document1, document2]);
        cy.findMany({ _id: _id }).then((result: any) => {
          console.log(result);
          assert.equal(result.length, 1);
          assert.strictEqual(result[0].test, document1.test);
          assert.isTrue(result[0]._id.equals(document1._id));
        });
      });

      it('Should find no documents', () => {
        const query = { id: faker.string.uuid() };
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
  },
);
