import {fluentProvide} from 'inversify-binding-decorators'

let provideThrowalbe = (identifier:any,name:any)=>{
  return fluentProvide(identifier).whenTargetNamed(name).done();
}

export {provideThrowalbe}