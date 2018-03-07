import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnotoolComponent } from './annotool.component';
import { AnnotoolRoutingModule } from './annotool-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnnotoolRoutingModule
  ],
  declarations: [
    AnnotoolComponent,
  ]
})
export class AnnotoolModule { }
