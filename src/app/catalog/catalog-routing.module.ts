import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { CatalogHomeComponent } from './catalog-home/catalog-home.component';
import { CatalogCategoryComponent } from './catalog-category/catalog-category.component';
import { CatalogSubCategoryComponent } from './catalog-sub-category/catalog-sub-category.component';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';

const routes: Routes = [
  {
    path:'',
    component:CatalogComponent,
    children:[
      {path:'home/:companyCode/:code',component:CatalogHomeComponent},
      {path:'category/:companyCode/:code/:id',component:CatalogCategoryComponent},
      {path:'sub-category/:companyCode/:code/:id/:sub-id',component:CatalogSubCategoryComponent},
      {path:'product/:companyCode/:code/:id/:sub-id/:product-id',component:CatalogProductComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
