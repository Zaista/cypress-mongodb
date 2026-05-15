import { faker } from '@faker-js/faker';

describe('Configuration: uri tests', () => {
  it('Should fail with missing uri error - aggregate', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Missing mongodb.uri environment variable'))
        return;
      throw error;
    });
    const pipeline = [{ $match: { id: 1 } }];
    cy.aggregate(pipeline, {}).then(() => {
      throw new Error('Should fail with missing uri error');
    });
  });

  it('Should fail with missing uri error - create', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Missing mongodb.uri environment variable'))
        return;
      throw error;
    });
    cy.createCollection('collection').then(() => {
      throw new Error('Should fail with missing uri error');
    });
  });

  it('Should fail with missing uri error - drop', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Missing mongodb.uri environment variable'))
        return;
      throw error;
    });
    cy.dropCollection('collection').then(() => {
      throw new Error('Should fail with missing uri error');
    });
  });

  it('Should fail with missing uri error - findOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Missing mongodb.uri environment variable'))
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
      if (error.message.includes('Missing mongodb.uri environment variable'))
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
      if (error.message.includes('Missing mongodb.uri environment variable'))
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
      if (error.message.includes('Missing mongodb.uri environment variable'))
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
      if (error.message.includes('Missing mongodb.uri environment variable'))
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
      if (error.message.includes('Missing mongodb.uri environment variable'))
        return;
      throw error;
    });
    const documents = [{ id: 1 }];
    cy.insertMany(documents).then(() => {
      throw new Error('Should fail with missing uri error');
    });
  });
});
