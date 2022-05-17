import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AddOrUpdateProductsComponent } from './add-or-update-products/add-or-update-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewEnlargedComponent } from './view-enlarged/view-enlarged.component';


const routes :Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path:'view',
    component: ViewProductsComponent
  },
  {
    path:'modify',
    component: ViewProductsComponent,
    data: {modifyButtons: true}
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,    
    AddOrUpdateProductsComponent, HomePageComponent, ViewEnlargedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
