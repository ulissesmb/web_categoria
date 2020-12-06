import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriaAdminComponent } from './segu/categoria-admin/categoria-admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'segu/categorias', component: CategoriaAdminComponent},
    {path: '**', component: NotFoundComponent},
];