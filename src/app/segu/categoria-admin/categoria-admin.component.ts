import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../../shared/message/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaAdminService } from '../../shared/service/categoria-admin.service';
import { Subject } from 'rxjs';
import { Categoria } from './categoria.model';

@Component({
  selector: 'app-categoria-admin',
  templateUrl: './categoria-admin.component.html',
  styleUrls: ['./categoria-admin.component.css']
})
export class CategoriaAdminComponent implements OnInit {

  categoriaForm: FormGroup;
  navigateTo: string;
  eventsSubject: Subject<void> = new Subject<void>();

  categoria: Categoria;
  categorias: Categoria[];
  public isValid = true;
  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private categoriaService: CategoriaAdminService,
              private activetedRoute: ActivatedRoute,
              private router: Router
    ) { }
  ngOnInit() {
    this.getCategorias();
    this.navigateTo = this.activetedRoute.snapshot.params['to'] || 'segu/categorias';
  }

  formBuilder(){
  }

  getCategorias(){
    this.categoriaService.getAll().subscribe(categoria =>  {
      this.categorias = categoria['data'];
      }
    );
  }

  editar(form: FormGroup){
    this.isValid = false;
    this.categoriaForm = form;
    this.keyUp();
  }

  keyUp(){
    this.categoriaForm.valueChanges.subscribe( x => {
      const index = String(x.categoriaName);
      this.isValid = false;
      this.isValid =  (index.length > 3) ? false : true;
    });
  }

  remover(registro: Categoria){
    this.categoriaService.detele(registro)
      .subscribe(
          response => {
            this.notificationService.notify(response['message']);
            this.getCategorias();
          },
          error =>  {
            if (error['status'] === 400){
              this.notificationService.notify('Categoria não pode ser excluida porque existe relacionamento.');
            }
            console.log('-- error: ', error);
          }
        );
  }

   cadastrar(form: FormGroup){
     if (form.controls.id.value === 0 || form.controls.id.value === '' ){
      this.categoriaService.cadastrar(form.controls.categoriaName.value)
      .subscribe( cat => {
        this.getCategorias();
        this.notificationService.notify(` ${cat['message']}`);
      },
      response => {
          this.notificationService.notify(response.error.error.description);
      },
      () => {
          this.router.navigate([this.navigateTo]) ;
      });
     } else {
      this.categoriaService.update(form.controls.id.value, form.controls.categoriaName.value)
       .subscribe( cat => {
        this.getCategorias();
        this.notificationService.notify(` ${cat['message']}`);
      },
      response => {
          this.notificationService.notify(response.error.error.description)
      },
      () => {
          this.router.navigate([this.navigateTo]);
      });
     }
   }
}
