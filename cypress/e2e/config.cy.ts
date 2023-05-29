import { faker } from '@faker-js/faker';

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
          console.log(error);
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
        cy.createCollection(faker.random.word(), {
          database: configuration_data.database,
        }).then((result) => {
          assert.equal('Collection created', result);
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
