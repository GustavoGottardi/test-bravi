import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './pageNotFound.component';

@NgModule({
    declarations: [
      PageNotFoundComponent
    ],
    imports: [
      BrowserModule
    ],
    providers: [],
    bootstrap: [PageNotFoundComponent]
  })
  export class ContactModule { }
  