import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityStorage } from '../security/security.storage';
import { TokenResponseModel } from '../models/token-response.model';
import { RequestService } from './request.service';
import { AlertService } from './alert.service';
import { SessionService } from './session.service';

/**
 * Manages security related actions
 */
@Injectable()
export class SecurityService {
    redirectUrl: string = '';

    constructor(private requestService: RequestService,
        private securityStorage: SecurityStorage,
        private alertService: AlertService,
        private sessionService: SessionService,
        private router: Router
    ) { }

    /**
     * Logins an user
     * @param {string} username Username
     * @param {string} password Password
     */
    login(username: string, password: string): void {
        this.requestService.getToken(username, password).subscribe(tokenResponse => {
            if (tokenResponse.error || tokenResponse.error_description) {
                this.alertService.showError(tokenResponse.error_description);
                return;
            }

            var validUntil = new Date();

            validUntil.setSeconds(validUntil.getSeconds() + tokenResponse.expires_in);
            tokenResponse.valid_until = validUntil;

            this.securityStorage.saveUserToken(tokenResponse);

            // If redirectUrl is informed, redirect the user to that route
            if (this.redirectUrl)
                this.router.navigate([this.redirectUrl]);
            else
                this.router.navigate(['home']);
        });
    }

    /**
     * Logs the user out
     */
    logout(): void {
        this.securityStorage.clear();
        this.sessionService.clearSession();
        this.router.navigate(['login']);
    }

    /**
     * Verifies if the user is logged in
     * @returns {boolean} whether the user is logged in
     */
    isLoggedIn(): boolean {
        var userToken = this.securityStorage.getUserToken();

        if (userToken != null)
            return new Date(userToken.valid_until as any).getTime() >= new Date().getTime();

        return false;
    }

    /**
     * Retrieves the TOKEN of the logged in user
     * @returns {string} TOKEN
     */
    getToken(): string {
        return this.securityStorage.getUserToken().access_token;
    }
}
