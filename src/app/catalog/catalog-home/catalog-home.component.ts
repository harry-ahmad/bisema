import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { environment } from '../../../environments/environment'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-catalog-home',
  templateUrl: './catalog-home.component.html',
  styleUrls: ['./catalog-home.component.scss']
})
export class CatalogHomeComponent implements OnInit {
  Eventsubscription:Subscription;
  baseUrl = environment.baseUrl;
  code="bsa";
  companyCode;
  catalogue;
  catalogueDescritption;
  constructor(private catalogService:CatalogService,private router:ActivatedRoute) { 
    this.Eventsubscription = this.catalogService.getcatalogHome().subscribe((res)=>{
      this.companyCode = res.companyCode;
      this.code = res.code;
      this.catalogService.getManufacturingCatalogue(this.companyCode,this.code).subscribe((res)=>{
        this.catalogue = res.CATALOG;
        this.getCatalogFile();
      })
    })
  }

  getCatalogue(){
    this.companyCode = this.router.snapshot.paramMap.get('companyCode');
    this.code = this.router.snapshot.paramMap.get('code');
    this.catalogService.getManufacturingCatalogue(this.companyCode,this.code).subscribe((res)=>{
      this.catalogue = res.CATALOG;
      this.sideNavigation(0);
    })
  }

  getCatalogFile(){
    this.catalogService.getCatalogueFile(this.companyCode,this.code).subscribe((res)=>{
      this.catalogueDescritption = res;
    })
  }

  downloadFile(file){
    this.catalogService.downloadFile(file).subscribe((res)=>{
    })
  }

  sideNavigation(id){
    this.catalogService.sendHomecatalog(id);
  }

  ngOnInit(): void {
    this.getCatalogue();
    this.getCatalogFile();
  }

}
