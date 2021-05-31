import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogRegisterComponent} from './dialog-register/dialog-register.component';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [RegisterComponent, DialogRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  entryComponents: [DialogRegisterComponent],
})
export class RegisterModule {
}
