"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideThrowalbe = void 0;
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
let provideThrowalbe = (identifier, name) => {
    return inversify_binding_decorators_1.fluentProvide(identifier).whenTargetNamed(name).done();
};
exports.provideThrowalbe = provideThrowalbe;
