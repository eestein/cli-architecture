import { Observable } from 'rxjs/Observable';
import { BaseStore } from './base.store';
import { BaseModel } from '../abstractions/base.model';
import { UrlParameterModel } from '../models/url-parameter.model';
import { RequestService } from '../services/request.service';
import { BaseSearchStore } from './base-search.store';

export class BaseCrudStore<T extends BaseModel> extends BaseSearchStore<T> {
    constructor() { super(); }

    /**
     * Retrieves a record
     * @param id Record's ID
     */
    get(id: number): Observable<T> {
        return this.requestService.makeGet<T>(this.getUrl('get'), new UrlParameterModel('id', id));
    }

    /**
     * Creates a new record
     * @param data Record's data
     */
    add(data: T): Observable<T> {
        return this.requestService.makePost<T>(this.getUrl('add'), data);
    }

    /**
     * Updates a record
     * @param data Record's data
     */
    edit(data: T): Observable<T> {
        return this.requestService.makePost<T>(this.getUrl('edit'), data);
    }

    /**
     * Removes a set of records
     * @param ids IDs of the records to be removed
     */
    remove(ids: string[]): Observable<boolean> {
        return this.requestService.makePost<boolean>(this.getUrl('remove'), ids);
    }
}
