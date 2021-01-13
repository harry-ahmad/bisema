import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from '../catalog.service';
import { environment } from '../../../environments/environment';
import { FileSaverService } from 'ngx-filesaver';
@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {
  baseUrl = environment.baseUrl;
  Eventsubscription:Subscription;
  catalogue;
  code="bsa";
  companyCode;
  productCatalog;
  subProductCatalog;
  productId;
  singleProductData = {
    id:null,
    item:null,
    group:[],
    price:null,
    description:null,
    finishImages:[],
    finishCode:[],
    finishPrice:[],
    finishName:[],
    qty:1
  };
  price;
  selectedSingleProductId;
  qty = new FormControl('1');
  cadFiles = [];
  autoCadForm = this.fb.group({
    dwg_2d:[''],
    dxf_2d:[''],
    rvt_2d:[''],
    dwg_3d:[''],
    dxf_3d:[''],
    rvt_3d:['']
  });
  constructor(private catalogService:CatalogService,private route:ActivatedRoute,private fb:FormBuilder,private _FileSaverService: FileSaverService) {
    this.Eventsubscription = this.catalogService.getcatalogProduct().subscribe((res=>{
      this.changeproduct(res.id,res.sub_id,res.product_id,false);
    }))
  }

  getCatalogue(){
    let categoryId = this.route.snapshot.paramMap.get('id');
    let subCategoryId = this.route.snapshot.paramMap.get('sub-id');
    this.productId = this.route.snapshot.paramMap.get('product-id');
    this.code = this.route.snapshot.paramMap.get('code');
    this.companyCode = this.route.snapshot.paramMap.get('companyCode');
    this.catalogService.getManufacturingCatalogue(this.companyCode,this.code).subscribe((res)=>{
      this.catalogue = res.CATALOG;
      this.changeproduct(categoryId,subCategoryId,this.productId,false);
    })
  }

  changeproduct(categoryId,subCategoryId,id,send){
    this.selectedSingleProductId = id;
    this.productId = id;
    this.productCatalog = this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL.find(x=>x.id==categoryId);
    this.subProductCatalog = this.productCatalog.LEVEL.LABEL.find(x=>x.id==subCategoryId);
    this.singleProductData.group        = [];
    this.singleProductData.finishImages = [];
    this.singleProductData.finishCode   = [];
    this.singleProductData.finishPrice  = [];
    this.singleProductData.finishName   = [];
    this.singleProductData.id = id;
    this.singleProductData.item = this.catalogue.ITEMS.ITEM.find(x => x.id == this.singleProductData.id);
    this.singleProductData.qty = 1;
    this.singleProductData.item.ITEM_GROUPS.ITEM_GROUP.forEach(element => {
      var grp = this.catalogue.GROUPS.GROUP.find(x => x.id == element.id);
      this.singleProductData.group.push(grp);
      this.singleProductData.finishCode.push(" ??");
    });
    this.singleProductData.price = parseFloat(this.singleProductData.item.PRICES.PRICE.Text);
    this.catalogService.getSectionTextFile(this.productCatalog.id,this.subProductCatalog.id,this.code,this.companyCode).subscribe((res) => {
      this.singleProductData.description = res;
    });
    this.price = this.singleProductData.price;
    if(send ==  true){
      this.catalogService.sendSubCategorycatalog(id);
    }
  }

  changePrice(){
    this.price = this.singleProductData.price * this.qty.value;
    this.price = parseFloat(this.price).toFixed(2);
  }
  codeChk = false;
  finish(id,name,ind,price,optionName){
    this.singleProductData.finishImages[ind] = id;
    this.singleProductData.finishCode[ind]   = name;
    this.singleProductData.finishPrice[ind]  = parseFloat(price);
    this.singleProductData.finishName[ind]   = optionName;
    let codeChk = this.singleProductData.finishCode.find(x=>x==" ??");
    if(codeChk==undefined){
      this.codeChk = true;
    }
  }

  selectCadFiles(){
    var cadFile = this.autoCadForm.value;
    let filesArray = [];
    if(cadFile.dxf_2d == true){
      filesArray.push(`${this.baseUrl}assets/${this.companyCode}/${this.code}/dwgformat/dxf/2d/${this.selectedSingleProductId.toLowerCase()}_2d.dxf`);
    }
    if(cadFile.dxf_3d == true){
      filesArray.push(`${this.baseUrl}assets/${this.companyCode}/${this.code}/dwgformat/dxf/3d/${this.selectedSingleProductId.toLowerCase()}_3d.dxf`);
    }
    if(cadFile.rvt_2d == true){
      filesArray.push(`${this.baseUrl}assets/${this.companyCode}/${this.code}/dwgformat/rvt/2d/${this.selectedSingleProductId.toLowerCase()}_2d.rvt`);
    }
    if(cadFile.rvt_3d == true){
      filesArray.push(`${this.baseUrl}assets/${this.companyCode}/${this.code}/dwgformat/rvt/3d/${this.selectedSingleProductId.toLowerCase()}_3d.rvt`);
    }
    if(cadFile.dwg_2d == true){
      filesArray.push(`${this.baseUrl}assets/${this.companyCode}/${this.code}/idrop/dwg/${this.selectedSingleProductId.toLowerCase()}_2d.dwg`);
    }
    if(cadFile.dwg_3d == true){
      filesArray.push(`${this.baseUrl}assets/${this.companyCode}/${this.code}/idrop/dwg/${this.selectedSingleProductId.toLowerCase()}_3d.dwg`);
    }
    let  interval = setInterval(function(filesArray){
      var url = filesArray.pop();
      var a = document.createElement("a");
      a.setAttribute('href', url);
      a.click();
      if (filesArray.length == 0) {
        clearInterval(interval);
      }
    }, 1000, filesArray);
  }

  downloadCadDrawings(){
    let filesArray = [
      `${this.baseUrl}assets/${this.companyCode}/${this.code}/idrop/dwg/${this.selectedSingleProductId.toLowerCase()}_2d.dwg`,
      `${this.baseUrl}assets/${this.companyCode}/${this.code}/idrop/dwg/${this.selectedSingleProductId.toLowerCase()}_3d.dwg`
    ];
    let  interval = setInterval(function(filesArray){
      var url = filesArray.pop();
      var a = document.createElement("a");
      a.setAttribute('href', url);
      a.click();
      if (filesArray.length == 0) {
        clearInterval(interval);
      }
    }, 1000, filesArray);
  }

  addToCart(){
    var fCode = this.singleProductData.finishCode.toString();
    fCode = fCode.replace(/,/g, '');
    let bgclr;
    if(fCode.includes("??")){
      bgclr = null;
    }else{
      bgclr = "#28a745";
    }
    let cartObj = {
      id : this.singleProductData.id,
      productCode: this.singleProductData.id+fCode,
      image:this.singleProductData.id.toLowerCase()+"_3d.png",
      description:this.singleProductData.description,
      price:this.singleProductData.price,
      qty:this.qty.value,
      total_amount:this.price,
      catalog_code:this.catalogue.code,
      user_id:1,
      long_desc:this.singleProductData.item.LONG_DESC.TEXT.Text,
      bg:bgclr,
      code:this.code,
      companyCode:this.companyCode
    }
    let d = new Date();
    let dObj = {
      "Catalogue Release Date":"May 23, 2019",
      "Manufacturing Company":cartObj.catalog_code,
      "Catalogue Name":cartObj.code,
      "Order Date":d.toDateString(),
      "id":cartObj.id,
      "Product Code":cartObj.productCode,
      "Image":cartObj.image,
      "Price":cartObj.price,
      "Quantity":cartObj.qty,
      "Total Amount":cartObj.total_amount,
      "User Id":cartObj.user_id,
      "Long Description":cartObj.long_desc,
      "Catalogue Code":cartObj.code,
      "Company Code":cartObj.companyCode,
    }
    const text = JSON.stringify(dObj);
    const fileName = `${this.singleProductData.item.LONG_DESC.TEXT.Text}.json`;
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([text], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
    // let cart = JSON.parse(localStorage.getItem('cart'));
    // cart.push(cartObj);
    // localStorage.setItem('cart',JSON.stringify(cart));
    // this.catalogService.sendProductCatalog();
  }

  ngOnInit(): void {
    this.getCatalogue();
  }

}
