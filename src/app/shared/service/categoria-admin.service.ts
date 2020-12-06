import { Injectable, Injector, OnInit } from '@angular/core';
import { Categoria } from '../../segu/categoria-admin/categoria.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ResponseBuilder } from '../model/response-builder.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaAdminService {

  categoria: Categoria;
  public API_ENDPOINT =  `${environment.api}/categorias`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getAll(): Observable<ResponseBuilder<Categoria>> {
    return this.http.get<ResponseBuilder<Categoria>>( this.API_ENDPOINT );
  }

  getById(idCategoria: number): Observable<ResponseBuilder<Categoria>> {
    return this.http.get<ResponseBuilder<Categoria>>(this.API_ENDPOINT + `/${idCategoria}`);
  }

  cadastrar(categoria: string): Observable<ResponseBuilder<Categoria>> {
    return this.http.post<ResponseBuilder<Categoria>>(this.API_ENDPOINT, {nome: categoria})
    .pipe(tap(cat => this.categoria = cat.data[0]));
  }

  update(idCategoria: number, categoria: string): Observable<ResponseBuilder<Categoria>> {
    return this.http.put<ResponseBuilder<Categoria>>(this.API_ENDPOINT, {id: idCategoria, nome: categoria})
    .pipe(tap(cat => this.categoria = cat.data[0]));
  }

  detele(categoria: Categoria): Observable<ResponseBuilder<Categoria>> {
    return this.http.delete<ResponseBuilder<Categoria>>(this.API_ENDPOINT + `/${categoria.id}`);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}
