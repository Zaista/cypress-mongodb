"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMongoDB = exports.setConfig = void 0;
var aggregate_util = require("./utils/aggregation");
var aggregate_commands = require("./commands/aggregation");
var collection_util = require("./utils/collection");
var collection_commands = require("./commands/collection");
var insert_util = require("./utils/insert");
var insert_commands = require("./commands/insert");
var delete_util = require("./utils/delete");
var delete_commands = require("./commands/delete");
var setConfig = function (on) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        on('task', {
            aggregate: function (args) {
                return aggregate_util.aggregate(args).then(function (result) {
                    return result;
                });
            },
        });
        on('task', {
            createCollection: function (args) {
                return collection_util.createCollection(args).then(function (result) {
                    return result;
                });
            },
        });
        on('task', {
            dropCollection: function (args) {
                return collection_util.dropCollection(args).then(function (result) {
                    return result;
                });
            },
        });
        on('task', {
            insertOne: function (args) {
                return insert_util.insertOne(args).then(function (result) {
                    return result;
                });
            },
        });
        on('task', {
            insertMany: function (args) {
                return insert_util.insertMany(args).then(function (result) {
                    return result;
                });
            },
        });
        on('task', {
            deleteOne: function (args) {
                return delete_util.deleteOne(args).then(function (result) {
                    return result;
                });
            },
        });
        on('task', {
            deleteMany: function (args) {
                return delete_util.deleteMany(args).then(function (result) {
                    return result;
                });
            },
        });
        return [2];
    });
}); };
exports.setConfig = setConfig;
var setupMongoDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Cypress.Commands.add('aggregate', aggregate_commands.aggregate);
        Cypress.Commands.add('createCollection', collection_commands.createCollection);
        Cypress.Commands.add('dropCollection', collection_commands.dropCollection);
        Cypress.Commands.add('insertOne', insert_commands.insertOne);
        Cypress.Commands.add('insertMany', insert_commands.insertMany);
        Cypress.Commands.add('deleteOne', delete_commands.deleteOne);
        Cypress.Commands.add('deleteMany', delete_commands.deleteMany);
        console.log('MongoDB plugin configured');
        return [2];
    });
}); };
exports.setupMongoDB = setupMongoDB;
