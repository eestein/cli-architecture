import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    private isSessionLoaded: boolean = false;
    private sessionTestData: string;

    constructor() {
        if (!this.isSessionLoaded)
            this.loadSession();
    }

    getSessionTestData(): string {
        return this.sessionTestData;
    }

    loadSession(): void {
        if (this.isSessionLoaded)
            return;

        // load your session data here
        this.sessionTestData = 'session test data';
    }

    clearSession(): void {
        this.sessionTestData = undefined;
        this.isSessionLoaded = false;
    }

    reloadSession(): void {
        this.clearSession();
        this.loadSession();
    }
}
