const aggregation_db = {
  uri: 'mongodb://localhost:27017',
  collection: 'aggregation_collection',
  database: 'aggregation_database',
  pipeline: [
    { id: 1, aggregation: 'aggregation_result' },
    { id: 2 },
    { id: 3 },
  ],
};

describe('Configuration tests', () => {
  it(
    'Should fail with missing uri error',
    {
      env: {
        MONGODB_DATABASE: aggregation_db.database,
        MONGODB_COLLECTION: aggregation_db.collection,
      },
    },
    () => {
      cy.on('fail', (error, runnable) => {
        if (error.message.includes('Missing MONGODB_URI environment variable'))
          return;
        throw error;
      });
      cy.aggregate([]).then(() => {
        throw new Error('Should fail with missing uri error');
      });
    }
  );

  it(
    'Should fail with missing database name error',
    {
      env: {
        MONGODB_URI: aggregation_db.uri,
        MONGODB_COLLECTION: aggregation_db.collection,
      },
    },
    () => {
      cy.on('fail', (error, runnable) => {
        if (error.message.includes('Database not specified')) return;
        throw error;
      });
      const pipeline = [{ $match: { id: 1 } }];
      cy.aggregate(pipeline).then(() => {
        throw new Error('Should fail with missing database name error');
      });
    }
  );

  it(
    'Should fail with missing collection name error',
    {
      env: {
        MONGODB_URI: aggregation_db.uri,
        MONGODB_DATABASE: aggregation_db.database,
      },
    },
    () => {
      cy.on('fail', (error, runnable) => {
        if (error.message.includes('Collection not specified')) return;
        throw error;
      });
      const pipeline = [{ $match: { id: 1 } }];
      cy.aggregate(pipeline).then(() => {
        throw new Error('Should fail with missing collection name error');
      });
    }
  );
});

describe(
  'Aggregation tests',
  {
    env: {
      MONGODB_URI: aggregation_db.uri,
      MONGODB_DATABASE: aggregation_db.database,
      MONGODB_COLLECTION: aggregation_db.collection,
    },
  },
  () => {
    before(() => {
      cy.insertMany(aggregation_db.pipeline);
    });

    it('Should match all documents', () => {
      cy.aggregate([]).then((result) => {
        assert.notEqual(result, undefined);
        assert.isAtLeast(result.length, 3);
      });
    });

    it('Should match specific documents', () => {
      const pipeline = [{ $match: { id: 1 } }];
      cy.aggregate(pipeline).then((result) => {
        assert.notEqual(result[0], undefined);
        assert.equal(result[0].aggregation, 'aggregation_result');
      });
    });
  }
);

const collection_db = {
  uri: 'mongodb://localhost:27017',
  collection: 'collection_collection',
  database: 'collection_database',
};

describe(
  'Collection tests',
  {
    env: {
      MONGODB_URI: collection_db.uri,
      MONGODB_DATABASE: collection_db.database,
      MONGODB_COLLECTION: collection_db.collection,
    },
  },
  () => {
    it('Should create new collections', () => {
      cy.createCollection(collection_db.collection).then((result) => {
        assert.equal(result, 'Collection created');
      });
    });

    it('Should fail creating existing collection', () => {
      cy.on('fail', (error, runnable) => {
        if (error.message.includes('Collection already exists')) return;
        throw error;
      });

      cy.createCollection(collection_db.collection).then(() => {
        throw new Error('Should fail with collection already exists error');
      });
    });

    it('Should drop created collection', () => {
      cy.dropCollection(collection_db.collection).then((res) => {
        assert.equal(res, 'Collection dropped');
      });
    });
  }
);
