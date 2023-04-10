import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

const insertion_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'insertion_collection',
  database: 'insertion_database',
  // pipeline: [{id: 1}, {id: 1}, {id: 2}, {id: 3}],
};
describe(
  'Insertion tests',
  {
    env: {
      mongodb: {
        uri: insertion_data.uri,
        database: insertion_data.database,
        collection: insertion_data.collection,
      },
    },
  },
  () => {
    describe('insertOne', () => {
      it('Should insert one document', () => {
        const document = {
          _id: faker.datatype.string(),
          word: faker.random.word(),
        };
        cy.insertOne(document).then((result) => {
          assert.strictEqual(result, document._id);
        });
        cy.findOne(document).then((result) => {
          assert.deepEqual(result, document);
        });
      });

      it('Should insert correct data types', () => {
        const document: any = {
          string: faker.datatype.string(),
          integer: faker.datatype.number(),
          boolean: faker.datatype.boolean(),
          double: faker.datatype.float(),
          array: faker.datatype.array() as any,
          date: new Date(),
          objectId: new ObjectId(),
          object: {
            innerObject: {
              date: new Date(),
              objectId: new ObjectId(),
              innerArray: [
                new Date(),
                new ObjectId(),
                {
                  date: new Date(),
                  objectId: new ObjectId(),
                },
                null,
              ],
            },
          },
          null: null,
        };
        cy.insertOne(document);
        cy.findOne({ string: document.string }).then((result: any) => {
          assert.strictEqual(result.string, document.string);
          assert.strictEqual(result.integer, document.integer);
          assert.strictEqual(result.boolean, document.boolean);
          assert.strictEqual(result.double, document.double);
          assert.deepStrictEqual(result.array, document.array);
          assert.strictEqual(
            result.date.toISOString(),
            document.date.toISOString()
          );
          assert.strictEqual(
            result.objectId.toString(),
            document.objectId.toString()
          );
          assert.strictEqual(result.objectId._bsontype, 'ObjectID');
          assert.strictEqual(
            result.objectId.toString(),
            document.objectId.toString()
          );
          assert.isTrue(result.object.innerObject.date instanceof Date);
          assert.strictEqual(
            result.object.innerObject.date.toISOString(),
            document.object.innerObject.date.toISOString()
          );
          assert.strictEqual(
            result.object.innerObject.objectId._bsontype,
            'ObjectID'
          );
          assert.strictEqual(
            result.object.innerObject.objectId.toString(),
            document.object.innerObject.objectId.toString()
          );
          assert.isTrue(
            result.object.innerObject.innerArray[0] instanceof Date
          );
          assert.strictEqual(
            result.object.innerObject.innerArray[0].toISOString(),
            document.object.innerObject.innerArray[0].toISOString()
          );
          assert.strictEqual(
            result.object.innerObject.innerArray[1]._bsontype,
            'ObjectID'
          );
          assert.strictEqual(
            result.object.innerObject.innerArray[1].toString(),
            document.object.innerObject.innerArray[1].toString()
          );
          assert.isTrue(
            result.object.innerObject.innerArray[2].date instanceof Date
          );
          assert.strictEqual(
            result.object.innerObject.innerArray[2].date.toISOString(),
            document.object.innerObject.innerArray[2].date.toISOString()
          );
          assert.strictEqual(
            result.object.innerObject.innerArray[2].objectId._bsontype,
            'ObjectID'
          );
          assert.strictEqual(
            result.objectId.toString(),
            document.objectId.toString()
          );
          assert.isNull(result.object.innerObject.innerArray[3]);
          assert.strictEqual(result.null, document.null);
        });
      });

      it('Should fail inserting one document - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Document must be an object')) return;
          throw error;
        });
        const query = [{ id: 1 }];
        cy.insertOne(query).then(() => {
          throw new Error('Should fail with document must be an object error');
        });
      });

      it('Should fail inserting one document - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Document must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.insertOne().then(() => {
          throw new Error('Should fail with document must be specified error');
        });
      });
    });

    describe('insertMany', () => {
      it('Should insert many documents', () => {
        const randomWord = faker.random.word();
        const documents = [
          { _id: faker.datatype.string(), word: randomWord },
          { _id: faker.datatype.string(), word: randomWord },
          { _id: faker.datatype.string(), word: randomWord },
        ];
        const expected_result = {
          '0': documents[0]._id,
          '1': documents[1]._id,
          '2': documents[2]._id,
        };
        cy.insertMany(documents).then((result) => {
          assert.deepEqual(result, expected_result);
        });
        const expected_documents = [
          {
            _id: documents[0]._id.toString(),
            word: randomWord,
          },
          {
            _id: documents[1]._id.toString(),
            word: randomWord,
          },
          {
            _id: documents[2]._id.toString(),
            word: randomWord,
          },
        ];
        cy.findMany({ word: randomWord }).then((result) => {
          assert.deepEqual(result, expected_documents);
        });
      });

      it('Should insert correct data types', () => {
        const uniqueString = faker.datatype.string();
        const documents: any = [
          {
            string: uniqueString,
            date: new Date(),
          },
          {
            string: uniqueString,
            objectId: new ObjectId(),
          },
          {
            string: uniqueString,
            integer: faker.datatype.number(),
            boolean: faker.datatype.boolean(),
            double: faker.datatype.float(),
            array: faker.datatype.array() as any,
            date: new Date(),
            objectId: new ObjectId(),
            object: {
              innerObject: {
                date: new Date(),
                objectId: new ObjectId(),
                innerArray: [
                  new Date(),
                  new ObjectId(),
                  {
                    date: new Date(),
                    objectId: new ObjectId(),
                  },
                  null,
                ],
              },
            },
            null: null,
          },
        ];
        cy.insertMany(documents);
        cy.findMany({ string: uniqueString }).then((result: any) => {
          assert.strictEqual(result.length, 3);

          assert.strictEqual(
            result[0].date.toISOString(),
            documents[0].date.toISOString()
          );

          assert.strictEqual(result[1].objectId._bsontype, 'ObjectID');
          assert.strictEqual(
            result[1].objectId.toString(),
            documents[1].objectId.toString()
          );

          assert.strictEqual(result[2].string, documents[2].string);
          assert.strictEqual(result[2].integer, documents[2].integer);
          assert.strictEqual(result[2].boolean, documents[2].boolean);
          assert.strictEqual(result[2].double, documents[2].double);
          assert.deepStrictEqual(result[2].array, documents[2].array);
          assert.strictEqual(
            result[2].date.toISOString(),
            documents[2].date.toISOString()
          );
          assert.strictEqual(
            result[2].objectId.toString(),
            documents[2].objectId.toString()
          );
          assert.strictEqual(result[2].objectId._bsontype, 'ObjectID');
          assert.strictEqual(
            result[2].objectId.toString(),
            documents[2].objectId.toString()
          );
          assert.isTrue(result[2].object.innerObject.date instanceof Date);
          assert.strictEqual(
            result[2].object.innerObject.date.toISOString(),
            documents[2].object.innerObject.date.toISOString()
          );
          assert.strictEqual(
            result[2].object.innerObject.objectId._bsontype,
            'ObjectID'
          );
          assert.strictEqual(
            result[2].object.innerObject.objectId.toString(),
            documents[2].object.innerObject.objectId.toString()
          );
          assert.isTrue(
            result[2].object.innerObject.innerArray[0] instanceof Date
          );
          assert.strictEqual(
            result[2].object.innerObject.innerArray[0].toISOString(),
            documents[2].object.innerObject.innerArray[0].toISOString()
          );
          assert.strictEqual(
            result[2].object.innerObject.innerArray[1]._bsontype,
            'ObjectID'
          );
          assert.strictEqual(
            result[2].object.innerObject.innerArray[1].toString(),
            documents[2].object.innerObject.innerArray[1].toString()
          );
          assert.isTrue(
            result[2].object.innerObject.innerArray[2].date instanceof Date
          );
          assert.strictEqual(
            result[2].object.innerObject.innerArray[2].date.toISOString(),
            documents[2].object.innerObject.innerArray[2].date.toISOString()
          );
          assert.strictEqual(
            result[2].object.innerObject.innerArray[2].objectId._bsontype,
            'ObjectID'
          );
          assert.strictEqual(
            result[2].object.innerObject.innerArray[2].objectId.toString(),
            documents[2].object.innerObject.innerArray[2].objectId.toString()
          );
          assert.isNull(result[2].object.innerObject.innerArray[3]);
          assert.strictEqual(result[2].null, documents[2].null);
        });
      });

      it('Should fail inserting many documents - incorrect pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Documents must be an array')) return;
          throw error;
        });
        const query = { id: 1 };
        // @ts-ignore
        cy.insertMany(query).then(() => {
          throw new Error('Should fail with documents must be an array error');
        });
      });

      it('Should fail inserting many documents - missing pipeline', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Documents must be specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.insertMany().then(() => {
          throw new Error('Should fail with documents must be specified error');
        });
      });
    });
  }
);
