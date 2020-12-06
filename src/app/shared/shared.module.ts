import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import {FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import { SnackbarComponent } from './message/snackbar/snackbar.component';
import { NotificationService } from './message/notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CPFPipe } from './pipes/cpf/cpf.pipe';
import { FIXOPipe } from './pipes/fixo/fixo.pipe';
import { CELPipe } from './pipes/celular/cel.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [InputComponent, SnackbarComponent, CPFPipe, FIXOPipe, CELPipe],
  exports: [InputComponent, CommonModule,
    FormsModule, ReactiveFormsModule, SnackbarComponent, CPFPipe, FIXOPipe, CELPipe]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        NotificationService
      ]
    };
  }
}
 