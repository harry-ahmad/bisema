import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { CatalogService } from './catalog.service';
import { environment } from '../../environments/environment'
import { FormControl } from '@angular/forms';
import { TreeModel, TreeNode, TreeComponent } from '@circlon/angular-tree-component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  Eventsubscription:Subscription;
  homesubscription:Subscription;
  categorytsubscription:Subscription;
  subcategoryscription:Subscription;
  companyControl = new FormControl('');
  companies = [];
  companyCatalogues = [];
  baseUrl = environment.baseUrl;
  code;
  companyCode;
  config={
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false
 }
  cartQty = 0;
  catalogue;
  selectedItem;
  showHome=false;
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  constructor(private catalogService:CatalogService,private router:Router) {
    this.Eventsubscription = this.catalogService.getProductCatalog().subscribe((res)=>{
      this.changeCartQuantity();
    });
    this.homesubscription = this.catalogService.getHomecatalog().subscribe((res)=>{
      this.sideNav(res);
    });
    this.categorytsubscription = this.catalogService.getCategorycatalog().subscribe((res)=>{
      this.sideNav(res);
    });
    this.subcategoryscription = this.catalogService.getSubCategorycatalog().subscribe((res)=>{
      this.sideNav(res);
    });
  }
  goCart(){
    const url = this.router.serializeUrl(this.router.createUrlTree(['/cart']));
    window.open(url, url);
  }
  goHome(){
    this.showHome = true;
    this.router.navigateByUrl(`catalog/home/${this.companyCode}/${this.code}`);
  }
  changeCategory(id){
    this.router.navigateByUrl(`/catalog/category/${this.companyCode}/${this.code}/${id}`);
    this.catalogService.sendcatalogCategory(id);
  }

  changeSubCategory(id,sub){
    this.router.navigateByUrl(`/catalog/sub-category/${this.companyCode}/${this.code}/${id}/${sub}`);
    this.catalogService.sendcatalogSubCategory({id:id,sub_id:sub});
  }

  changeProduct(id,sub,productId){
    this.router.navigateByUrl(`/catalog/product/${this.companyCode}/${this.code}/${id}/${sub}/${productId}`);
    let data = {
      id:id,
      sub_id:sub,
      product_id:productId
    }
    this.catalogService.sendcatalogProduct(data);
    this.selectedItem = productId;
  }
  getCatalogue(code){
    this.code = code;
    this.companyCode = this.companyControl.value;
    this.catalogService.getManufacturingCatalogue(this.companyCode,this.code).subscribe((res)=>{
      this.catalogue = res.CATALOG;
      this.nodes = [];
      for (let index = 0; index < this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL.length; index++) {
        const element = {
          id:this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].id,
          name:this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].DESCRIPTIONS.TEXT.Text,
          children:[]
        }
        for (let i = 0; i < this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].LEVEL.LABEL.length; i++) {
          const element2 = {
            id:this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].LEVEL.LABEL[i].id,
            name:this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].LEVEL.LABEL[i].DESCRIPTIONS.TEXT.Text,
            children:[]
          }
          for (let y = 0; y < this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].LEVEL.LABEL[i].TOC_ITEMS.TOC_ITEM.length; y++) {
            const element3 = {
              id:this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].LEVEL.LABEL[i].TOC_ITEMS.TOC_ITEM[y].id,
              name:this.catalogue.TABLE_OF_CONTENTS.LEVEL.LABEL.LEVEL.LABEL[index].LEVEL.LABEL[i].TOC_ITEMS.TOC_ITEM[y].id
            }
            element2.children.push(element3);
          }
          element.children.push(element2);
        }
        this.nodes.push(element);
      }
      this.router.navigateByUrl(`catalog/home/${this.companyCode}/${this.code}`);
      this.catalogService.sendcatalogHome({'companyCode':this.companyCode,'code':this.code});
    })
  }
  options = {};
  nodes = [
  ];
  onEvent(event){
    let someNode = this.tree.treeModel.getNodeById(event.node.data.id);
    if(typeof(someNode.parent.data.id)=="number"){
      let siblings = someNode.parent.data.children;
      for(let i=0;i<siblings.length;i++){
        let siblingNode = this.tree.treeModel.getNodeById(siblings[i].id);
        siblingNode.collapseAll();
      }
      this.changeCategory(someNode.data.id)
    }else if(someNode.data.children != undefined){
      let siblings = someNode.parent.data.children;
      for(let i=0;i<siblings.length;i++){
        let siblingNode = this.tree.treeModel.getNodeById(siblings[i].id);
        siblingNode.collapseAll();
      }
      this.changeSubCategory(someNode.parent.data.id,someNode.data.id)
    }else{
      const grandParentNode = this.tree.treeModel.getNodeById(someNode.parent.data.id)
      this.changeProduct(grandParentNode.parent.data.id,someNode.parent.data.id,someNode.data.id)
    }
    someNode.expand();
  }

  sideNav(id){
    if(id == 0){
      this.tree.treeModel.collapseAll();
      let someNode = this.tree.treeModel.getActiveNode();
      if(someNode){
        someNode.setIsActive(false);
      }
    }else{
      let someNode = this.tree.treeModel.getNodeById(id);
      let siblings = someNode.parent.data.children;
      for(let i=0;i<siblings.length;i++){
        let siblingNode = this.tree.treeModel.getNodeById(siblings[i].id);
        siblingNode.collapseAll();
      }
      someNode.expand();
      someNode.setIsActive(true);
    }
  }
  logout(){
    if("user" in localStorage){
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    }
  }
  onCompanyChange(){
    this.getCompanyCatalogues();
    this.catalogue = null;
    this.router.navigateByUrl('/catalog');
  }
  getCompanyCatalogues(){
    let companyCode = this.companyControl.value;
    this.catalogService.getCompanyCatalogues(companyCode).subscribe((res)=>{
      this.companyCatalogues = res.message;
    })
  }
  getCompanies(){
    this.catalogService.getCompanies().subscribe((res)=>{
      this.companies = res.message;
      this.companyControl.setValue(this.companies[0].name);
      this.getCompanyCatalogues();
    });
  }
  changeCartQuantity(){
    if(!("cart" in localStorage)){
      localStorage.setItem('cart',JSON.stringify([]));
    }
    let cart = JSON.parse(localStorage.getItem('cart'));
    this.cartQty = cart.length;
  }
  ngOnInit(): void {
    // this.changeCartQuantity();
    this.getCompanies();
  }

}
