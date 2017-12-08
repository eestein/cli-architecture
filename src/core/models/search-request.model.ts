import { BaseModel } from '../abstractions/base.model';

export class SearchRequestModel extends BaseModel {
    constructor(
        public Description?: string
    ) {
        super();
    }
}
