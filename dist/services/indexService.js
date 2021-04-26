"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexService = void 0;
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const tags_1 = __importDefault(require("../constant/tags"));
let IndexService = class IndexService {
    constructor() {
        this.userStorage = [{
                email: '1231@qq.com',
                name: '小明'
            }, {
                email: '2131231@qq.com',
                name: '小w1231231'
            }];
    }
    getUser(id) {
        let result;
        result = this.userStorage[id];
        return result;
    }
    addUser(user) {
        this.userStorage.push(user);
    }
};
IndexService = __decorate([
    inversify_binding_decorators_1.provide(tags_1.default.IndexService)
], IndexService);
exports.IndexService = IndexService;
