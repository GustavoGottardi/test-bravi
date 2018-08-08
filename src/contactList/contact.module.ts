import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './contact.component';


@NgModule({
    declarations: [
      ContactListComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [ContactListComponent]
  })
  export class ContactModule { }
  