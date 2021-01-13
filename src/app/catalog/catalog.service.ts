import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogCategory    = new Subject<any>();
  private catalogSubCategory = new Subject<any>();
  private catalogProduct     = new Subject<any>();
  private catalogHome        = new Subject<any>();
  private categoryCatalog    = new Subject<any>();
  private subCategoryCatalog = new Subject<any>();
  private homeCatalog        = new Subject<any>();
  private productCatalog     = new Subject<any>();
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getCompanies():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getCompanyCatalogues(code):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}${code}`);
  }
  getManufacturingCatalogue(companyCode,code):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}assets/${companyCode}/${code}/${code}.json`);
  }

  getCatalogueFile(companyCode,code):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}assets/${companyCode}/${code}/catalogue_text.txt`,{ responseType: 'text' as 'json'});
  }
  getGalleryImages(companyCode,code):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}assets/${companyCode}/${code}/gallery/filenames.json`);
  }

  getSectionTextFile(productId,subProductId,code,companyCode):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}assets/${companyCode}/${code}/sections/${productId}/text/eng/${subProductId}.txt`,{ responseType: 'text' as 'json'});
  }

  downloadFile(file):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}file`,{'file':file});
  }


  sendcatalogCategory(id) {
    this.catalogCategory.next(id);
  }
  getcatalogCategory(): Observable<any>{ 
    return this.catalogCategory.asObservable();
  }
  sendcatalogSubCategory(data) {
    this.catalogSubCategory.next(data);
  }
  getcatalogSubCategory(): Observable<any>{ 
    return this.catalogSubCategory.asObservable();
  }
  sendcatalogProduct(data) {
    this.catalogProduct.next(data);
  }
  getcatalogProduct(): Observable<any>{ 
    return this.catalogProduct.asObservable();
  }
  sendcatalogHome(data) {
    this.catalogHome.next(data);
  }
  getcatalogHome(): Observable<any>{ 
    return this.catalogHome.asObservable();
  }

  sendCategorycatalog(id) {
    this.categoryCatalog.next(id);
  }
  getCategorycatalog(): Observable<any>{ 
    return this.categoryCatalog.asObservable();
  }
  sendSubCategorycatalog(data) {
    this.subCategoryCatalog.next(data);
  }
  getSubCategorycatalog(): Observable<any>{ 
    return this.subCategoryCatalog.asObservable();
  }

  sendHomecatalog(data) {
    this.homeCatalog.next(data);
  }
  getHomecatalog(): Observable<any>{ 
    return this.homeCatalog.asObservable();
  }

  sendProductCatalog() {
    this.productCatalog.next();
  }
  getProductCatalog(): Observable<any>{ 
    return this.productCatalog.asObservable();
  }
}
