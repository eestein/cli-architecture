import { BaseModel } from './base.model';
import { BaseStore } from './base.store';
import { SearchRequestModel } from '../models/search-request.model';
import { SearchResponseModel } from '../models/search-response.model';
import { UrlParameterModel } from '../models/url-parameter.model';
import { KeyValueModel } from '../models/key-value.model';
import { Observable } from 'rxjs/Observable';

export abstract class BaseSearchStore<T extends BaseModel> extends BaseStore {
    protected constructor() { super(); }

    /**
     * Searchs for records
     * @param [description] Text to use as filter
     */
    search(description?: string): Observable<SearchResponseModel<T>> {
        return this.requestService.makePost<SearchResponseModel<T>>(this.getUrl('search'), new SearchRequestModel(description));
    }

    /**
     * Retrieves a list of records
     * @param [description] Text to use as filter
     */
    list(description: string = '', baseId: number = null): Observable<SearchResponseModel<KeyValueModel>> {
        return this.requestService.makeGet<SearchResponseModel<KeyValueModel>>(this.getUrl('list'),
            new UrlParameterModel('description', description));
    }
}
