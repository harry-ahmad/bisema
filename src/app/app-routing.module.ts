import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {path : 'login',loadChildren: ()=> import ('./auth/auth.module').then(m => m.AuthModule)},
  {path : 'cart',canActivate: [AuthGuard],loadChildren: ()=> import ('./cart/cart.module').then(m => m.CartModule)},
  {path : 'catalog',canActivate: [AuthGuard],loadChildren: ()=> import ('./catalog/catalog.module').then(m => m.CatalogModule)},
  {path : '', redirectTo:"catalog",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
