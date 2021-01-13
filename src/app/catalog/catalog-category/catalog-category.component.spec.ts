import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCategoryComponent } from './catalog-category.component';

describe('CatalogCategoryComponent', () => {
  let component: CatalogCategoryComponent;
  let fixture: ComponentFixture<CatalogCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
