import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactListComponent } from '../contactList/contact.component';
import { BalancedBracketsComponent } from '../balancedBrackets/balanced.component';
import { PageNotFoundComponent } from '../pageNotFound/pageNotFound.component';

const appRoutes: Routes = [
  { path: 'contact-list', component: ContactListComponent },
  { path: 'balanced-brackedts', component: BalancedBracketsComponent },
  { path: '',
    redirectTo: '/contact-list',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    BalancedBracketsComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
