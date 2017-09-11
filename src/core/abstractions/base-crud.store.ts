import { BaseStore } from './base.store';
import { BaseModel } from '../abstractions/base.model';
import { Observable } from 'rxjs/Observable';
import { UrlParameterModel } from '../models/url-parameter.model';
import { RequestService } from '../services/request.service';

export class BaseCrudStore<T extends BaseModel> extends BaseStore {
    constructor() { super(); }

    /**
     * Obtém um registro
     * @param {number} id ID do registro
     */
    get(id: number): Observable<T> {
        return this.requestService.makeGet<T>(this.getUrl('get'), new UrlParameterModel('id', id));
    }

    /**
     * Cria um novo registro
     * @param {T} data Dados do registro
     */
    add(data: T): Observable<T> {
        return this.requestService.makePost<T>(this.getUrl('add'), data);
    }

    /**
     * Atualiza os dados de um registro
     * @param {T} data Dados a serem atualizados
     */
    edit(data: T): Observable<T> {
        return this.requestService.makePost<T>(this.getUrl('update'), data);
    }

    /**
     * Exclui os registros informados
     * @param {number[]} ids IDs dos registros a serem excluídos
     */
    remove(ids: number[]): Observable<boolean> {
        return this.requestService.makePost<boolean>(this.getUrl('remove'), ids);
    }
}
