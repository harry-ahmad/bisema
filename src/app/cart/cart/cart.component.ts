import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  baseUrl = environment.baseUrl;
  cart = [];
  grandTotal = 0;
  selectedIndex = [];
  constructor(private cartService:CartService,private router:Router,private _FileSaverService: FileSaverService) { }

  order(){
    this.cartService.createOrder(this.cart).subscribe((res) => {
      console.log(this.cart);
      localStorage.setItem('cart',JSON.stringify([]));
      let documentData = [];
      for(var i=0;i<this.cart.length;i++){
        let d = new Date();
        let dObj = {
          "Catalogue Release Date":"May 23, 2019",
          "Manufacturing Company":this.cart[i].catalog_code,
          "Catalogue Name":this.cart[i].code,
          "Order Date":d.toDateString(),
          "id":this.cart[i].id,
          "Product Code":this.cart[i].productCode,
          "Image":this.cart[i].image,
          "Price":this.cart[i].price,
          "Quantity":this.cart[i].qty,
          "Total Amount":this.cart[i].total_amount,
          "User Id":this.cart[i].user_id,
          "Long Description":this.cart[i].long_desc,
          "Catalogue Code":this.cart[i].code,
          "Company Code":this.cart[i].companyCode,
        }
        documentData.push(dObj);
      }
      const text = JSON.stringify(documentData);
      const fileName = `cart.txt`;
      const fileType = this._FileSaverService.genType(fileName);
      const txtBlob = new Blob([text], { type: fileType });
      this._FileSaverService.save(txtBlob, fileName);
    });
  }

  logout(){
    if("user" in localStorage){
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    }
  }
  checkBox(index){
    let chKindex = this.selectedIndex.find(x=>x==index);
    if(chKindex == undefined){
      this.selectedIndex.push(index);
    }else{
      let removeIndex = this.selectedIndex.findIndex(x=>x==index);
      this.selectedIndex.splice(removeIndex,1);
    }
  }
  removeItem(){
    this.selectedIndex.forEach(element=>{
      this.cart.splice(element,1);
    });
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.grandTotal = 0;
    this.cart.forEach(element => {
      this.grandTotal = this.grandTotal + element.total_amount;
    });
    this.grandTotal = +this.grandTotal.toFixed(2);
  }
  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.grandTotal = 0;
    this.cart.forEach(element => {
      this.grandTotal = this.grandTotal + element.total_amount;
    });
    this.grandTotal = +this.grandTotal.toFixed(2);
  }

}
