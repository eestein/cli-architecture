import { BaseModel } from './base.model';

export abstract class BaseEntityModel extends BaseModel {
    Id: number = 0;
    ChangedProperties: string[];
}
