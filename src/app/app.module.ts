import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutsModule } from './components/layouts/layouts.module';
import { LoggerService } from '../core/services/logger.service';
import { SessionService } from '../core/services/session.service';
import { SecurityService } from '../core/services/security.service';
import { AlertService } from '../core/services/alert.service';
import { RequestService } from '../core/services/request.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        LayoutsModule
    ],
    providers: [
        RequestService,
        AlertService,
        SecurityService,
        SessionService,
        LoggerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
