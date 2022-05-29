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
          collection: configuration_data.collection,
          database: configuration_data.database,
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
        assert.equal(result[0].aggregation, 'aggregation_result');
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
        assert.equal(result, 'Collection created');
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

    it('Should drop created collection', () => {
      cy.dropCollection(collection_data.collection).then((res) => {
        assert.equal(res, 'Collection dropped');
      });
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
        cy.deleteOne(pipeline).then((result) => {
          assert.match(result, /1 document deleted/);
        });
      });

      it('Should delete 0 documents', () => {
        const pipeline = { id: 'non existing' };
        cy.deleteOne(pipeline).then((result) => {
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
        cy.deleteMany(pipeline).then((result) => {
          assert.match(result, /3 documents deleted/);
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
          assert.equal(result.id, query.id);
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

      it('Should find no documents', () => {
        const query = { id: 5 };
        cy.findMany(query).then((result: any) => {
          assert.equal(result.length, 0);
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
  pipeline: [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }],
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
          assert.equal(result, document._id);
        });
        cy.findOne(document).then((result) => {
          assert.deepEqual(result, document);
        });
      });

      it('Should insert one document - force ObjectId', () => {
        const document = {
          _id: new ObjectId(faker.datatype.hexadecimal(24).substring(2)),
          word: faker.random.word(),
        };
        cy.insertOne(document, { forceObjectId: true }).then((result) => {
          assert.equal(result, document._id);
        });
        cy.findOne({ word: document.word }).then((result) => {
          assert.deepEqual(result, {
            _id: document._id.toString(),
            word: document.word,
          });
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

      it('Should insert many documents - force ObjectId', () => {
        const randomWord = faker.random.word();
        const documents = [
          {
            _id: new ObjectId(faker.datatype.hexadecimal(24).substring(2)),
            word: randomWord,
          },
          {
            _id: new ObjectId(faker.datatype.hexadecimal(24).substring(2)),
            word: randomWord,
          },
          {
            _id: new ObjectId(faker.datatype.hexadecimal(24).substring(2)),
            word: randomWord,
          },
        ];

        const expected_result = {
          '0': documents[0]._id.toString(),
          '1': documents[1]._id.toString(),
          '2': documents[2]._id.toString(),
        };
        cy.insertMany(documents, { forceObjectId: true }).then((result) => {
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
