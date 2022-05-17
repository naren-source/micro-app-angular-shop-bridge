import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from '../products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ViewProductsComponent } from './view-products.component';
import { ProductModel } from '../productmodel';
import { AddOrUpdateProductsComponent } from '../add-or-update-products/add-or-update-products.component';

describe('ViewProductsComponent', () => {
  let component: ViewProductsComponent;
  let fixture: ComponentFixture<ViewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductsComponent, AddOrUpdateProductsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create view products component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get product list details once we hit the fetch product api calling method', async(() => {
    let resultData = [{
      id: 1234,
      name: 'abc',
      price: 35,
      desc: 'salkndlknasd',
      image: 'https://image.jpg',
      cateory: 'Fiction',
      stockavailable: true
    }];
    let productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(resultData));    
    fixture.detectChanges();
    fixture.whenStable().then(() => {      
      expect(component.listOfProducts).toBe(resultData);
    });
  }));

  it('should get paginated when component instantiates', () => {
    let someRandomNo = 12;
    for(let i=0;i<someRandomNo;i++){
      component.listOfProducts.push(new ProductModel(1,'abc',12,'adas','asda.jpg','Fiction',true));
    }        
    fixture.detectChanges();
    component.pagination(1);    
    expect(component.paginatedList.length === component.entriesPerPage).toBeTrue();
  });


  it('should get open edit/new form based on values passed', async(() => {    
    let resultData = [{
      id: 1234,
      name: 'abc',
      price: 35,
      desc: 'salkndlknasd',
      image: 'https://image.jpg',
      cateory: 'Fiction',
      stockavailable: true
    }];
    let productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(resultData));    
    fixture.detectChanges();    
    fixture.whenStable().then(() => {
      component.enableModifyButtons = true;
      component.openNew = false;
      component.openEnlargedView = false;
      fixture.detectChanges();
      expect(component.listOfProducts).toBe(resultData);      
      let buttonEdit = fixture.debugElement.nativeElement.querySelector('#openFormIdEdit');      
      buttonEdit.click(resultData[0]);
      expect(component.editThisproduct === resultData[0]).toBeTrue();
      expect(component.openEdit).toBeTrue();
      let buttonNew = fixture.debugElement.nativeElement.querySelector('#openFormIdNew');      
      buttonNew.click(null);
      expect(component.editThisproduct === null).toBeTrue();
      expect(component.openNew).toBeTrue();    
    });      
  }));

  it('should close edit/new form based on values passed', () => {
    fixture.detectChanges();
    component.closeTheForm('edit');
    expect(component.openEdit).toBeFalse();
    component.closeTheForm('new');
    expect(component.openNew).toBeFalse();
  });

  it('should enlarge an item on click over an item', async(() => {
    let resultData = [{
      id: 1234,
      name: 'abc',
      price: 35,
      desc: 'salkndlknasd',
      image: 'https://image.jpg',
      cateory: 'Fiction',
      stockavailable: true
    }];
    let productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(resultData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.listOfProducts).toBe(resultData);
      let clickedItem = fixture.debugElement.nativeElement.querySelector('.product-item')
      clickedItem.click(resultData[0]);
      expect(component.openEnlargedView).toBe(!component.enableModifyButtons);
      expect(component.itemToBeEnlarged).toBe(resultData[0]);  
    });
  }));

  it('should get close enlarged view after click on \'here\' link', () => {    
    component.openEnlargedView = true;
    fixture.detectChanges();
    let item = fixture.debugElement.nativeElement.querySelector('.link')
    item.click();    
    expect(component.openEnlargedView).toBe(false);
  });

});
