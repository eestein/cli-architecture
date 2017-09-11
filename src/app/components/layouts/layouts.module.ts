import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BasicLayoutComponent } from "./basic-layout.component";
import { BlankLayoutComponent } from "./blank-layout.component";


@NgModule({
    declarations: [
        BasicLayoutComponent,
        BlankLayoutComponent
    ],
    imports: [
        BrowserModule,
        RouterModule
    ],
    exports: [
        BasicLayoutComponent,
        BlankLayoutComponent
    ],
})
export class LayoutsModule { }
