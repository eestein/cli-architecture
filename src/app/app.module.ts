import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutsModule } from './components/layouts/layouts.module';
import { LoggerService } from '../core/services/logger.service';
import { SessionService } from '../core/services/session.service';
import { SecurityService } from '../core/services/security.service';
import { AlertService } from '../core/services/alert.service';
import { RequestService } from '../core/services/request.service';
import { HomeComponent } from './views/home.component';
import { LoginComponent } from './views/login/login.component';
import { AppRoutes } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
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
