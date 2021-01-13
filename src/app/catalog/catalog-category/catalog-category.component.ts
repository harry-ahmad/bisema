import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from '../catalog.service';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-catalog-category',
  templateUrl: './catalog-category.component.html',
  styleUrls: ['./catalog-category.component.scss']
})
export class CatalogCategoryComponent implements OnInit {
  baseUrl = environment.baseUrl;
  Eventsubscription:Subscription;
  catalogue;
  code="bsa";
  companyCode;
  gallery = [];
  productCatalog;
  constructor(private catalogService:CatalogService,private route:ActivatedRoute) {
    this.Eventsubscription = this.catalogService.getcatalogCategory().subscribe((res) => {
      this.changeCategory(res,false)
    });
  }

  getCatalogue(){
    let categoryId = this.route.snapshot.paramMap.get('id');
    this.code = this.route.snapshot.paramMap.get('code');
    this.companyCode = this.route.snapshot.paramMap.get('companyCode');
    this.catalogService.getManufacturingCatalogue(this.companyCode,this.code).subscribe((res)=>{
      this.catalogue = res.CATALOG;
      this.changeCategory(categoryId,true);
    })
  }

  getGalleryImages(){
    this.catalogService.getGalleryImages(this.companyCode,this.code).subscribe((res:any) => {
      this.gallery = res.filenames;
    })
  }

  changeCategory(id,send){
    this.productCatalog = this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL.find(x=>x.id==id);
    if(send == true){
      this.catalogService.sendCategorycatalog(id);
    }
    
  }

  sideNavigation(id){
    this.catalogService.sendCategorycatalog(id);
  }

  ngOnInit(): void {
    this.getCatalogue();
    this.getGalleryImages();
  }

}
