import {faker} from "@faker-js/faker";

const command_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'command_collection',
  database: 'command_database',
};
describe(
  'Command tests',
  {
    env: {
      mongodb: {
        uri: command_data.uri,
        database: command_data.database,
      },
    },
  },
  () => {
    it('Should run listCollections command', () => {
      const randomCollection = faker.word.sample();
      let flag = false;
      cy.createCollection(randomCollection);
      const command = { listCollections: 1, nameOnly: true }
      cy.runCommand(command).then((result: any) => {
        result.cursor.firstBatch.forEach((collection: any) => {
          if (collection.name === randomCollection) {
            flag = true;
          }
        });
        assert.isTrue(flag);
      });
    });

    it('Should run ping command', () => {
      const command = { ping: 1 }
      cy.runCommand(command).then((result: any) => {
        assert.deepEqual(result, { ok: 1 });
      });
    });
  },
);
