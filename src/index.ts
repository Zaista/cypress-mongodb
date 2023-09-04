import * as aggregate_util from './utils/aggregation';
import * as collection_util from './utils/collection';
import * as insert_util from './utils/insert';
import * as delete_util from './utils/delete';
import * as find_util from './utils/find';
import * as update_util from './utils/update';

export function configurePlugin(on: Cypress.PluginEvents) {
  on('task', {
    aggregate(args) {
      return aggregate_util.aggregate(args).then((result) => {
        return result;
      });
    },

    createCollection(args) {
      return collection_util.createCollection(args).then((result) => {
        return result;
      });
    },

    dropCollection(args) {
      return collection_util.dropCollection(args).then((result) => {
        return result;
      });
    },

    insertOne(args) {
      return insert_util.insertOne(args).then((result) => {
        return result;
      });
    },

    insertMany(args) {
      return insert_util.insertMany(args).then((result) => {
        return result;
      });
    },

    deleteOne(args) {
      return delete_util.deleteOne(args).then((result) => {
        return result;
      });
    },

    deleteMany(args) {
      return delete_util.deleteMany(args).then((result) => {
        return result;
      });
    },

    findOne(args) {
      return find_util.findOne(args).then((result) => {
        return result;
      });
    },

    findOneAndUpdate(args) {
      return find_util.findOneAndUpdate(args).then((result) => {
        return result;
      });
    },

    findOneAndDelete(args) {
      return find_util.findOneAndDelete(args).then((result) => {
        return result;
      });
    },

    findMany(args) {
      return find_util.findMany(args).then((result) => {
        return result;
      });
    },

    updateOne(args) {
      return update_util.updateOne(args).then((result) => {
        return result;
      });
    },

    updateMany(args) {
      return update_util.updateMany(args).then((result) => {
        return result;
      });
    },
  });
}
