import { BaseModel } from '../abstractions/base.model';

export class UrlParameterModel extends BaseModel {
    constructor(
        public key: string,
        public value: Object) {
        super();
    }
}
