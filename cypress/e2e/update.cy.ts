import { faker } from '@faker-js/faker';

const updating_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'updating_collection',
  database: 'updating_database',
};
describe(
  'Updating tests',
  {
    env: {
      mongodb: {
        uri: updating_data.uri,
        database: updating_data.database,
        collection: updating_data.collection,
      },
    },
  },
  () => {
    describe('updateOne', () => {
      it('Should update one document', () => {
        const uuid = faker.datatype.uuid();
        const testData = [
          { uuid: uuid, value: 'initial value' },
          { uuid: uuid, value: 'initial value' },
        ];
        cy.insertMany(testData);
        const filter = { uuid: uuid };
        const document = { $set: { value: 'updated value' } };
        cy.updateOne(filter, document).then((result: any) => {
          assert.equal(result.acknowledged, true);
          assert.equal(result.matchedCount, 1);
          assert.equal(result.modifiedCount, 1);
        });
        cy.findMany({ uuid: uuid }).then((result: any) => {
          assert.equal(result[0].value, 'updated value');
          assert.equal(result[1].value, 'initial value');
        });
      });

      it('Should upsert one document', () => {
        const uuid = faker.datatype.uuid();
        const newUuid = faker.datatype.uuid();
        const filter = { uuid: uuid };
        const document = { $set: { uuid: newUuid } };
        cy.updateOne(filter, document, { upsert: true }).then((result: any) => {
          assert.equal(result.acknowledged, true);
          assert.equal(result.matchedCount, 0);
          assert.equal(result.modifiedCount, 0);
          assert.equal(result.upsertedCount, 1);
        });
        cy.findMany({ uuid: newUuid }).then((result: any) => {
          assert.equal(result[0].uuid, newUuid);
          assert.equal(result.length, 1);
        });
      });

      it('Should update correct data types', () => {
        const document: any = {
          uuid: faker.datatype.uuid(),
          date: new Date(),
          object: { innerDate: new Date() },
        };
        cy.insertOne(document);
        const filter = { uuid: document.uuid };
        const updatedDocument = {
          $set: {
            uuid: faker.datatype.uuid(),
            date: new Date('2000-01-01'),
            object: { innerDate: new Date('02/02/2002') },
          },
        };
        cy.updateOne(filter, updatedDocument);
        cy.findOne({ uuid: document.uuid }).then((result) => {
          assert.isNull(result);
        });
        cy.findOne({ uuid: updatedDocument.$set.uuid }).then((result: any) => {
          assert.isTrue(result.date instanceof Date);
          assert.strictEqual(
            result.date.toISOString(),
            updatedDocument.$set.date.toISOString()
          );
          assert.isTrue(result.object.innerDate instanceof Date);
          assert.strictEqual(
            result.object.innerDate.toISOString(),
            updatedDocument.$set.object.innerDate.toISOString()
          );
        });
      });

      it('Should fail updating one document - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Filter must be an object')) return;
          throw error;
        });
        const filter = [{ id: 1 }];
        cy.updateOne(filter, {}).then(() => {
          throw new Error('Should fail with document must be an object error');
        });
      });

      it('Should fail updated one document - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Document must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.updateOne({}).then(() => {
          throw new Error('Should fail with document must be specified error');
        });
      });
    });

    describe('insertMany', () => {
      it('Should update many documents', () => {
        const uuid = faker.datatype.uuid();
        const testData = [
          { uuid: uuid, value: 'initial value one' },
          { uuid: uuid, value: 'initial value two' },
          { uuid: uuid, value: 'initial value three' },
        ];
        cy.insertMany(testData);
        const filter = { uuid: uuid };
        const document = { $set: { value: 'updated many values' } };
        cy.updateMany(filter, document).then((result: any) => {
          assert.equal(result.acknowledged, true);
          assert.equal(result.matchedCount, 3);
          assert.equal(result.modifiedCount, 3);
        });
        cy.findMany({ uuid: uuid }).then((result: any) => {
          assert.strictEqual(result.length, 3);
          assert.equal(result[0].value, document.$set.value);
          assert.equal(result[1].value, document.$set.value);
          assert.equal(result[2].value, document.$set.value);
        });
      });

      it('Should upsert many documents', () => {
        const uuid = faker.datatype.uuid();
        const newUuid = faker.datatype.uuid();
        const filter = { uuid: uuid };
        const document = { $set: { uuid: newUuid } };
        cy.updateMany(filter, document, { upsert: true }).then(
          (result: any) => {
            assert.equal(result.acknowledged, true);
            assert.equal(result.matchedCount, 0);
            assert.equal(result.modifiedCount, 0);
            assert.equal(result.upsertedCount, 1);
          }
        );
        cy.findMany({ uuid: newUuid }).then((result: any) => {
          assert.equal(result[0].uuid, newUuid);
          assert.equal(result.length, 1);
        });
      });

      it('Should update many correct data types', () => {
        const uuid = faker.datatype.uuid();
        const documents = [
          {
            uuid: uuid,
            date: new Date(),
          },
          {
            uuid: uuid,
            array: [new Date()],
          },
          {
            uuid: uuid,
            null: 'not null',
          },
        ];
        cy.insertMany(documents);
        const filter = { uuid: uuid };
        const updatedDocument = {
          $set: {
            date: new Date('2000-01-01'),
            array: [new Date('2002-02-02')],
            null: null,
          },
        };
        cy.updateMany(filter, updatedDocument);
        cy.findMany({ uuid: uuid }).then((results: any) => {
          results.forEach((result) => {
            assert.isTrue(result.date instanceof Date);
            assert.strictEqual(
              result.date.toISOString(),
              updatedDocument.$set.date.toISOString()
            );
            assert.deepStrictEqual(result.array, updatedDocument.$set.array);
            assert.strictEqual(result.null, updatedDocument.$set.null);
          });
        });
      });

      it('Should fail updating many documents - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Filter must be an object')) return;
          throw error;
        });
        const filter = [{ id: 1 }];
        cy.updateMany(filter, {}).then(() => {
          throw new Error('Should fail with documents must be an object error');
        });
      });

      it('Should fail inserting many documents - missing arguments', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Document must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.updateMany({}).then(() => {
          throw new Error('Should fail with documents must be specified error');
        });
      });
    });
  }
);
