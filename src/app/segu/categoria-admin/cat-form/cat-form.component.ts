import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.css']
})
export class CatFormComponent implements OnInit {

  @Input() categoriaForm: FormGroup;
  @Output() saveCategoria = new EventEmitter();
  @Input() isValid = true;
  PATTERN = '^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9_-]{2,20}$';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categoriaForm = this.fb.group({
      id: [''] ,
      categoriaName: ['', [Validators.pattern(this.PATTERN), Validators.minLength(3) ]]
    });
    this.keyUp();
  }

  get form() {
    return this.categoriaForm.controls;
   }

  salvar() {
    this.isValid = false;
    this.saveCategoria.emit(this.categoriaForm);
  }

  keyUp(){
    this.categoriaForm.valueChanges.subscribe( x => {
      const index = String(x.categoriaName);
      this.isValid =  (index.length > 3) ? false : true;
    });
  }

  limpar(){
    this.keyUp();
    this.categoriaForm.patchValue({
      id: 0,
      categoriaName: ''});
    this.isValid = true;
  }

}
