import { Routes } from '@angular/router';
import { BasicLayoutComponent } from './components/layouts/basic-layout.component';
import { BlankLayoutComponent } from './components/layouts/blank-layout.component';
import { HomeComponent } from './views/home.component';
import { LoginComponent } from './views/login/login.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    // Screens using the basic layout
    {
        path: '',
        component: BasicLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent }
        ]
    },

    // Screens using the blank layout
    {
        path: '', component: BlankLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },

    // All other routes
    {
        path: '**',
        redirectTo: 'home'
    }
];
