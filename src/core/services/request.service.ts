import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TokenResponseModel } from '../models/token-response.model';
import { UrlParameterModel } from '../models/url-parameter.model';
import { SecurityStorage } from '../security/security.storage';
import { AlertService } from './alert.service';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';
import { Globals } from '../utils/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

const ApiUrl: string = `${environment.baseUrl}api/`;

/**
 * Manages all server-side requests
 */
@Injectable()
export class RequestService {
    constructor(
        private http: Http,
        private securityStorage: SecurityStorage,
        private alertService: AlertService,
        private loggerService: LoggerService,
        private globals: Globals
    ) { }

    /**
     * Makes a GET type request
     * @param {string} url URL
     */
    makeGet<T>(url: string, ...params: UrlParameterModel[]): Observable<T> {
        return this.makeRequest<T>('get', this.getUrl(url, false, params));
    }

    /**
     * Makes a POST type request
     * @param {string} url URL
     */
    makePost<T>(url: string, data?: Object): Observable<T> {
        return this.makeRequest<T>('post', this.getUrl(url), data);
    }

    /**
     * Makes a PUT type request
     * @param {string} url URL
     */
    makePut<T>(url: string, data?: Object): Observable<T> {
        return this.makeRequest<T>('put', this.getUrl(url), data);
    }

    /**
     * Makes a DELETE type request
     * @param {string} url URL
     */
    makeDelete(url: string): void {
        this.makeRequest('delete', this.getUrl(url));
    }

    /**
     * Makes a POST with file type request
     * @param {string} url URL
     */
    makeFilePost<T>(url: string, data?: Object): Observable<T> {
        return this.makeRequest<T>('post', this.getUrl(url), data, true);
    }

    /**
     * Requests a TOKEN - logins the user
     * @param {string} username Username
     * @param {string} password Password
     */
    getToken(username: string, password: string): Observable<TokenResponseModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.getUrl('token', true),
            `username=${username}&password=${encodeURI(password)}&grant_type=password`, options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                this.loggerService.error(error);
                this.alertService.showAlert('It was not possible to login, try again.');

                return Observable.empty();
            })
            .finally(() => {
                this.globals.setIsMakingRequest(false);
            });
    }

    private makeRequest<T>(type: string, url: string, data?: Object, hasFile: boolean = false): Observable<T> {
        let request: Observable<Response>;
        let bodyString = data != null ? JSON.stringify(data) : "";
        let headers = hasFile ? new Headers() : new Headers({ 'Content-Type': 'application/json' });
        let userToken = this.securityStorage.getUserToken();

        if (userToken && new Date(userToken.valid_until as any).getTime() >= new Date().getTime())
            headers.append('Authorization', `Bearer ${userToken.access_token}`);

        let options = new RequestOptions({ headers: headers });

        if (hasFile) {
            request = this.http.post(url, data, options);
        } else {
            switch (type) {
                case "get":
                    request = this.http.get(url, options);
                    break;
                case "post":
                    request = this.http.post(url, bodyString, options);
                    break;
                case "put":
                    request = this.http.put(url, bodyString, options);
                    break;
                case "delete":
                    request = this.http.delete(url, options);
                    break;
            }
        }

        return request
            .map((res: Response) => res.json())
            .catch((error: any) => {
                this.loggerService.error(error);

                if (error.status == 500) {
                    this.alertService.showError(error._body);
                } else if (error.status == 588) {
                    this.alertService.showAlert(error._body);
                }

                return Observable.empty();
            })
            .finally(() => {
                this.globals.setIsMakingRequest(false);
            });
    }

    private getUrl(url: string, isBase: boolean = false, params: UrlParameterModel[] = []): string {
        let currentUrl: string = (isBase ? environment.baseUrl : ApiUrl) + url;
        let isFirstRun: boolean = true;

        if (params.length > 0) {
            for (let param of params) {
                if (isFirstRun) {
                    isFirstRun = false;
                    currentUrl += `?${param.key}=${param.value}`;
                } else {
                    currentUrl += `&${param.key}=${param.value}`;
                }
            }
        }

        return currentUrl;
    }
}
