import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BalancedBracketsComponent } from './balanced.component';

@NgModule({
    declarations: [
      BalancedBracketsComponent
    ],
    imports: [
      BrowserModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [BalancedBracketsComponent]
  })
  export class BalancedModule { }
  