import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CatalogHomeComponent } from './catalog-home/catalog-home.component';
import { CatalogCategoryComponent } from './catalog-category/catalog-category.component';
import { CatalogSubCategoryComponent } from './catalog-sub-category/catalog-sub-category.component';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';
import { FileSaverModule } from 'ngx-filesaver';
@NgModule({
  declarations: [CatalogComponent, CatalogHomeComponent, CatalogCategoryComponent, CatalogSubCategoryComponent, CatalogProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    FileSaverModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
