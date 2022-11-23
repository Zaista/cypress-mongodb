import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

describe('Configuration tests', () => {
  const configuration_data = {
    uri: 'mongodb://localhost:27017',
    collection: 'configuration_collection',
    database: 'configuration_database',
  };

  describe(
    'Uri',
    {
      env: {
        mongodb: {
          database: configuration_data.database,
          collection: configuration_data.collection,
        },
      },
    },
    () => {
      it('Should fail with missing uri error - aggregate', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const pipeline = [{ $match: { id: 1 } }];
        cy.aggregate(pipeline).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - create', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        cy.createCollection(configuration_data.collection).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - drop', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        cy.dropCollection(configuration_data.collection).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - findOne', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const query = { id: 1 };
        cy.findOne(query).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - findMany', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const query = { id: 1 };
        cy.findMany(query).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing uri error - deleteOne', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const filter = { id: 1 };
        cy.deleteOne(filter).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - deleteMany', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const filter = { id: 1 };
        cy.deleteMany(filter).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - insertOne', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const document = { id: 1 };
        cy.insertOne(document).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });

      it('Should fail with missing uri error - insertMany', () => {
        cy.on('fail', (error) => {
          if (
            error.message.includes('Missing mongodb.uri environment variable')
          )
            return;
          throw error;
        });
        const documents = [{ id: 1 }];
        cy.insertMany(documents).then(() => {
          throw new Error('Should fail with missing uri error');
        });
      });
    }
  );

  describe(
    'Database',
    {
      env: {
        mongodb: {
          uri: configuration_data.uri,
          collection: configuration_data.collection,
        },
      },
    },
    () => {
      it('Should fail with missing database name error - aggregate', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const pipeline = [{ $match: { id: 1 } }];
        cy.aggregate(pipeline).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - create', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        cy.createCollection(configuration_data.collection).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - drop', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        cy.dropCollection(configuration_data.collection).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - findOne', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const query = { id: 1 };
        cy.findOne(query).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - findMany', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const query = { id: 1 };
        cy.findMany(query).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - deleteOne', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const filter = { id: 1 };
        cy.deleteOne(filter).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - deleteMany', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const filter = { id: 1 };
        cy.deleteMany(filter).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - insertOne', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const document = { id: 1 };
        cy.insertOne(document).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });

      it('Should fail with missing database name error - insertMany', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Database not specified')) return;
          throw error;
        });
        const documents = [{ id: 1 }];
        cy.insertMany(documents).then(() => {
          throw new Error('Should fail with missing database name error');
        });
      });
    }
  );

  describe(
    'Collection',
    {
      env: {
        mongodb: {
          uri: configuration_data.uri,
          database: configuration_data.database,
        },
      },
    },
    () => {
      it('Should fail with missing collection name error - aggregate', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const pipeline = [{ $match: { id: 1 } }];
        cy.aggregate(pipeline).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - create', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.createCollection().then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - drop', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        // @ts-ignore
        cy.dropCollection().then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - findOne', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const query = { id: 1 };
        cy.findOne(query).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - findMany', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const query = { id: 1 };
        cy.findMany(query).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - deleteOne', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const filter = { id: 1 };
        cy.deleteOne(filter).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - deleteMany', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const filter = { id: 1 };
        cy.deleteMany(filter).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - insertOne', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const document = { id: 1 };
        cy.insertOne(document).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });

      it('Should fail with missing collection name error - insertMany', () => {
        cy.on('fail', (error) => {
          if (error.message.includes('Collection not specified')) return;
          throw error;
        });
        const documents = [{ id: 1 }];
        cy.insertMany(documents).then(() => {
          throw new Error('Should fail with missing collection name error');
        });
      });
    }
  );

  describe(
    'Options',
    {
      env: {
        mongodb: {
          uri: configuration_data.uri,
        },
      },
    },
    () => {
      it('Should work with provided options - create', () => {
        cy.createCollection(configuration_data.collection, {
          database: configuration_data.database,
        });
      });
      it('Should work with provided options - aggregate', () => {
        const pipeline = [{ $match: { id: 1 } }];
        cy.aggregate(pipeline, {
          collection: configuration_data.collection,
          database: configuration_data.database,
        });
      });

      it('Should work with provided options - findOne', () => {
        const query = { id: 1 };
        cy.findOne(query, {
          collection: finding_data.collection,
          database: finding_data.database,
        });
      });

      it('Should work with provided options - findMany', () => {
        const query = { id: 1 };
        cy.findMany(query, {
          collection: configuration_data.collection,
          database: configuration_data.database,
        });
      });

      it('Should work with provided options - deleteOne', () => {
        const filter = { id: 1 };
        cy.deleteOne(filter, {
          collection: configuration_data.collection,
          database: configuration_data.database,
        });
      });

      it('Should work with provided options - deleteMany', () => {
        const filter = { id: 1 };
        cy.deleteMany(filter, {
          collection: configuration_data.collection,
          database: configuration_data.database,
        });
      });

      it('Should work with provided options - insertOne', () => {
        const document = { id: 1 };
        cy.insertOne(document, {
          collection: configuration_data.collection,
          database: configuration_data.database,
        });
      });

      it('Should work with provided options - insertMany', () => {
        const documents = [{ id: 1 }];
        cy.insertMany(documents, {
          collection: configuration_data.collection,
          database: configuration_data.database,
        });
      });
      it('Should work with provided options - drop', () => {
        cy.dropCollection(configuration_data.collection, {
          database: configuration_data.database,
        });
      });
    }
  );
});

const aggregation_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'aggregation_collection',
  database: 'aggregation_database',
  pipeline: [
    { id: 1, aggregation: 'aggregation_result' },
    { id: 2 },
    { id: 3 },
  ],
};

describe(
  'Aggregation tests',
  {
    env: {
      mongodb: {
        uri: aggregation_data.uri,
        database: aggregation_data.database,
        collection: aggregation_data.collection,
      },
    },
  },
  () => {
    before(() => {
      cy.insertMany(aggregation_data.pipeline);
    });

    it('Should match all documents', () => {
      cy.aggregate([]).then((result: any) => {
        assert.notEqual(result, undefined);
        assert.isAtLeast(result.length, 3);
      });
    });

    it('Should match specific documents', () => {
      const pipeline = [{ $match: { id: 1 } }];
      cy.aggregate(pipeline).then((result: any) => {
        assert.notEqual(result[0], undefined);
        assert.strictEqual(result[0].aggregation, 'aggregation_result');
      });
    });

    it('Should return correct data types', () => {
      const document = {
        _id: new ObjectId(
          faker.datatype.hexadecimal({ length: 24 }).substring(2)
        ),
        string: faker.datatype.uuid(),
        date: new Date(),
        boolean: faker.datatype.boolean(),
        float: faker.datatype.float(),
      };
      cy.insertOne(document);
      const pipeline = [
        {
          $match: {
            $and: [
              {
                _id: {
                  $eq: document._id,
                },
              },
              {
                string: {
                  $eq: document.string,
                },
              },
              {
                date: {
                  $eq: document.date,
                },
              },
              {
                boolean: {
                  $eq: document.boolean,
                },
              },
              {
                float: {
                  $eq: document.float,
                },
              },
            ],
          },
        },
      ];
      cy.aggregate(pipeline).then((result: any) => {
        assert.strictEqual(result[0]._id.toString(), document._id.toString());
        assert.strictEqual(result[0].string, document.string);
        assert.strictEqual(
          result[0].date.toISOString(),
          document.date.toISOString()
        );
        assert.strictEqual(result[0]._id._bsontype, 'ObjectID');
        assert.strictEqual(result[0].boolean, document.boolean);
        assert.strictEqual(result[0].float, document.float);
        assert.strictEqual(result.length, 1);
      });
    });

    it('Should fail aggregating - incorrect pipeline', () => {
      cy.on('fail', (error) => {
        if (
          error.message.includes('Pipeline must be a valid mongodb aggregation')
        )
          return;
        throw error;
      });
      const pipeline = { id: 2 };
      // @ts-ignore
      cy.aggregate(pipeline).then(() => {
        throw new Error('Should fail with pipeline must be an array error');
      });
    });

    it('Should fail aggregating - missing pipeline', () => {
      cy.on('fail', (error) => {
        if (error.message.includes('Pipeline must be specified')) return;
        throw error;
      });
      // @ts-ignore
      cy.aggregate().then(() => {
        throw new Error('Should fail with pipeline must be specified error');
      });
    });
  }
);

const collection_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'collection_collection',
  database: 'collection_database',
};
describe(
  'Collection tests',
  {
    env: {
      mongodb: {
        uri: collection_data.uri,
        database: collection_data.database,
      },
    },
  },
  () => {
    it('Should create new collections', () => {
      cy.createCollection(collection_data.collection).then((result) => {
        assert.strictEqual(result, 'Collection created');
      });
    });

    it('Should fail creating existing collection', () => {
      cy.on('fail', (error) => {
        if (error.message.match(/Collection ('\w+.\w+' )?already exists/i))
          return;
        throw error;
      });

      cy.createCollection(collection_data.collection).then(() => {
        throw new Error('Should fail with collection already exists error');
      });
    });

    it('Should not fail creating existing collection', () => {
      cy.createCollection(collection_data.collection, { failSilently: true })
        .its('codeName')
        .should('equal', 'NamespaceExists');
    });

    it('Should drop created collection', () => {
      cy.dropCollection(collection_data.collection).then((res) => {
        assert.strictEqual(res, 'Collection dropped');
      });
    });

    it('Should not fail dropping nonexistant collection', () => {
      cy.dropCollection(collection_data.collection, { failSilently: true })
        .its('codeName')
        .should('equal', 'NamespaceNotFound');
    });

    it('Should fail when no collection name is provided', () => {
      cy.on('fail', (error) => {
        if (error.message.includes('Collection not specified')) return;
        throw error;
      });

      // @ts-ignore
      cy.createCollection().then(() => {
        throw new Error('Should fail with collection not specified error');
      });
    });
  }
);

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
        const _id = new ObjectId(
          faker.datatype.hexadecimal({ length: 24 }).substring(2)
        );
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
        const _id = new ObjectId(
          faker.datatype.hexadecimal({ length: 24 }).substring(2)
        );
        const _id2 = new ObjectId(
          faker.datatype.hexadecimal({ length: 24 }).substring(2)
        );
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
          objectId: new ObjectId(
            faker.datatype.hexadecimal({ length: 24 }).substring(2)
          ),
          object: {
            innerObject: {
              date: new Date(),
              objectId: new ObjectId(
                faker.datatype.hexadecimal({ length: 24 }).substring(2)
              ),
              innerArray: [
                new Date(),
                new ObjectId(
                  faker.datatype.hexadecimal({ length: 24 }).substring(2)
                ),
                {
                  date: new Date(),
                  objectId: new ObjectId(
                    faker.datatype.hexadecimal({ length: 24 }).substring(2)
                  ),
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
            objectId: new ObjectId(
              faker.datatype.hexadecimal({ length: 24 }).substring(2)
            ),
          },
          {
            string: uniqueString,
            integer: faker.datatype.number(),
            boolean: faker.datatype.boolean(),
            double: faker.datatype.float(),
            array: faker.datatype.array() as any,
            date: new Date(),
            objectId: new ObjectId(
              faker.datatype.hexadecimal({ length: 24 }).substring(2)
            ),
            object: {
              innerObject: {
                date: new Date(),
                objectId: new ObjectId(
                  faker.datatype.hexadecimal({ length: 24 }).substring(2)
                ),
                innerArray: [
                  new Date(),
                  new ObjectId(
                    faker.datatype.hexadecimal({ length: 24 }).substring(2)
                  ),
                  {
                    date: new Date(),
                    objectId: new ObjectId(
                      faker.datatype.hexadecimal({ length: 24 }).substring(2)
                    ),
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
