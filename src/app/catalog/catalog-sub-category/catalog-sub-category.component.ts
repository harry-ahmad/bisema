import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from '../catalog.service';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-catalog-sub-category',
  templateUrl: './catalog-sub-category.component.html',
  styleUrls: ['./catalog-sub-category.component.scss']
})
export class CatalogSubCategoryComponent implements OnInit {
  baseUrl = environment.baseUrl;
  code = "bsa";
  companyCode;
  Eventsubscription:Subscription;
  catalogue;
  productCatalog;
  subProductCatalog
  constructor(private catalogService:CatalogService,private route:ActivatedRoute) {
    this.Eventsubscription = this.catalogService.getcatalogSubCategory().subscribe((res)=>{
      this.changeSubCategory(res.id,res.sub_id,false);
    })
  }

  getCatalogue(){
    let categoryId = this.route.snapshot.paramMap.get('id');
    let subCategoryId = this.route.snapshot.paramMap.get('sub-id');
    this.code = this.route.snapshot.paramMap.get('code');
    this.companyCode = this.route.snapshot.paramMap.get('companyCode');
    this.catalogService.getManufacturingCatalogue(this.companyCode,this.code).subscribe((res)=>{
      this.catalogue = res.CATALOG;
      this.changeSubCategory(categoryId,subCategoryId,true);
    })
  }

  changeSubCategory(id,subId,send){
    this.productCatalog = this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL.find(x=>x.id==id);
    this.subProductCatalog = this.productCatalog.LEVEL.LABEL.find(x=>x.id==subId);
    if(send == true){
      this.catalogService.sendSubCategorycatalog(subId);
    }
    
  }

  sideNavigation(id){
    this.catalogService.sendSubCategorycatalog(id);
  }

  ngOnInit(): void {
    this.getCatalogue();
  }

}
