import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSubCategoryComponent } from './catalog-sub-category.component';

describe('CatalogSubCategoryComponent', () => {
  let component: CatalogSubCategoryComponent;
  let fixture: ComponentFixture<CatalogSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
