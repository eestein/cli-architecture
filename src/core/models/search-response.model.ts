import { BaseModel } from "../abstractions/base.model";

export class SearchResponseModel<T extends BaseModel> {
    Records: Array<T>;
    PageSize: number;
    TotalRecords: number;
}
