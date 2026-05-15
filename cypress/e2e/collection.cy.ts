const collection = 'collection_collection';

describe('Collection tests', () => {
  it('Should create new collections', () => {
    cy.createCollection(collection).then((result) => {
      assert.strictEqual(result, 'Collection created');
    });
  });

  it('Should fail creating existing collection', () => {
    cy.on('fail', (error) => {
      if (error.message.match(/Collection ('\w+.\w+' )?already exists/i))
        return;
      throw error;
    });

    cy.createCollection(collection).then(() => {
      throw new Error('Should fail with collection already exists error');
    });
  });

  it('Should drop created collection', () => {
    cy.dropCollection(collection).then((res) => {
      assert.strictEqual(res, 'Collection dropped');
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
});
