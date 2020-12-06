import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadingStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocationStrategy, HashLocationStrategy, registerLocaleData, PathLocationStrategy } from '@angular/common';
import locatePt from '@angular/common/locales/pt';

registerLocaleData(locatePt, 'pt');

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { AplicationErrorHandler } from './app.error-handler';
import { SeguComponent } from './segu/segu.component';
import { CategoriaAdminComponent } from './segu/categoria-admin/categoria-admin.component';
import { CatListComponent } from './segu/categoria-admin/cat-list/cat-list.component';
import { CategoriaAdminService } from './shared/service/categoria-admin.service';
import { CatFormComponent } from './segu/categoria-admin/cat-form/cat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    UserDetailComponent,
    SeguComponent,
    CategoriaAdminComponent,
    CatListComponent,
    CatFormComponent
  ],
  imports: [
  HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy},
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: ErrorHandler, useClass: AplicationErrorHandler},
    CategoriaAdminService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
