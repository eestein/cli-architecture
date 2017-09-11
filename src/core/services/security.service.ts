import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityStorage } from '../security/security.storage';
import { TokenResponseModel } from '../models/token-response.model';
import { RequestService } from './request.service';
import { AlertService } from './alert.service';
import { SessionService } from './session.service';

/**
 * Serviço responsável pela segurança do usuário
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
     * Loga um usuário
     * @param {string} username Nome de usuário
     * @param {string} password Senha
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

            // todo: se necessário buscar dados do usuário e preencher na sessão (SessionService)

            // se redirectUrl estiver preenchido, redirecionar o usuário
            if (this.redirectUrl)
                this.router.navigate([this.redirectUrl]);
            else
                this.router.navigate(['home']);
        });
    }

    /**
     * Finaliza a sessão do usuário
     */
    logout(): void {
        this.securityStorage.clear();
        this.sessionService.clearSession();
        this.router.navigate(['login']);
    }

    /**
     * Retorna se o usuário está logado
     * @returns {boolean} Se o usuário está logado
     */
    isLoggedIn(): boolean {
        var userToken = this.securityStorage.getUserToken();

        if (userToken != null)
            return new Date(userToken.valid_until as any).getTime() >= new Date().getTime();

        return false;
    }

    /**
     * Obtém o TOKEN do usuário logado
     * @returns {string} TOKEN do usuário logado
     */
    getToken(): string {
        return this.securityStorage.getUserToken().access_token;
    }
}
