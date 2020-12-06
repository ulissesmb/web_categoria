import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Categoria } from '../categoria.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {
  @Input() categorias: Categoria[];
  @Output() removeCategoria = new EventEmitter();
  @Output() editCategoria = new EventEmitter();
  PATTERN = '^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9_-]{2,20}$';

  categoriaForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  remover(registro: Categoria){
    if (confirm(`Deseja excluir o registro ${registro.nome} ?`)) {
      this.removeCategoria.emit(registro);
    }
  }

  editar(registro: Categoria){
    if (confirm(`Deseja alterar o registro ${registro.nome} ?`)) {
      this.formBuilder(registro);
      console.log('filho: ', this.categoriaForm);
      this.editCategoria.emit(this.categoriaForm);
    }
  }

  formBuilder(categoria: Categoria){
    this.categoriaForm = this.fb.group({
      id: [categoria.id] ,
      categoriaName: [categoria.nome, [Validators.pattern(this.PATTERN), Validators.minLength(3) ]
      ]
    });
    this.keyUp();
  }

  keyUp(){
    this.categoriaForm.valueChanges.subscribe( x =>{
      const index = String(x.categoriaName);
      return (index.length > 3) ? false : true;
    });
  }



}
