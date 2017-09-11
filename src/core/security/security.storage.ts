import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { TokenResponseModel } from '../models/token-response.model';

const UserToken = "UserToken";

@Injectable()
export class SecurityStorage {
    constructor(
        private localStorageService: LocalStorageService
    ) { }

    saveUserToken(userToken: TokenResponseModel): void {
        this.localStorageService.set(UserToken, userToken);
    }

    getUserToken(): TokenResponseModel {
        return this.localStorageService.get<TokenResponseModel>(UserToken);
    }

    save<T>(data: T, key: string): void {
        this.localStorageService.set(key, data);
    }

    get<T>(key: string): T {
        return this.localStorageService.get<T>(key);
    }

    clear(): void {
        this.localStorageService.clearAll();
    }
}
