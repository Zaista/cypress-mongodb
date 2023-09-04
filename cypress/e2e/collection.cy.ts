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
  },
);
