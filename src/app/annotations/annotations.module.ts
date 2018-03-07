import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnotationsRoutingModule } from './annotations-routing.module';
import { AnnotationsComponent } from './annotations.component';

@NgModule({
  imports: [
    CommonModule,
    AnnotationsRoutingModule,
    FormsModule,
  ],
  declarations: [
    AnnotationsComponent,
  ]
})
export class AnnotationsModule { }
