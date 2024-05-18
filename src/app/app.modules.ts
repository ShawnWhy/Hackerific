import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from  '@angular/platform-browser';
import { AppComponent } from  './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import { NgModel } from '@angular/forms';
RouterModule.forRoot(routes, { useHash: true });
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
   
    // Component declarations go here
  ],
  imports: [
    NgModel,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule
    // Angular modules and external dependencies go here
  ],
  providers: [
    HttpClientModule
    // "_HttpClient"
    // Services and other providers go here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }