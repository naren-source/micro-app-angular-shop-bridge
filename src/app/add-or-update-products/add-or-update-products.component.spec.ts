import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { AddOrUpdateProductsComponent } from './add-or-update-products.component';

describe('AddOrUpdateProductsComponent', () => {
  let component: AddOrUpdateProductsComponent;
  let fixture: ComponentFixture<AddOrUpdateProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateProductsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create add-update component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create a form on component instantiation', () => {
    fixture.detectChanges();
    expect(component.productForm).toBeTruthy();
    expect(component.productForm.get('productName')).toBeTruthy();
    expect(component.productForm.get('productPrice')).toBeTruthy();
    expect(component.productForm.get('productDesc')).toBeTruthy();
    expect(component.productForm.get('productUrl')).toBeTruthy();
    expect(component.productForm.get('productCategory')).toBeTruthy();
  });
  
  it('should set form values if product exists initially', () => {
    let item = {
      id: 1234,
      name: 'abc',
      price: 35,
      desc: 'salkndlknasd',
      image: 'https://image.jpg',
      cateory: 'Fiction',
      stockavailable: true
    };
    component.productItem = item;
    fixture.detectChanges();
    expect(component.productForm.get('productName').value).toBe(item.name);
    expect(component.productForm.get('productPrice').value).toBe(item.price);
    expect(component.productForm.get('productDesc').value).toBe(item.desc);
    expect(component.productForm.get('productUrl').value).toBe(item.image);
    expect(component.productForm.get('productCategory').value).toBe(item.cateory);
  });

  it('should not set form values if product exists initially', () => {
    component.productItem = null;
    fixture.detectChanges();
    expect(component.productForm.get('productName').value).toBe(null);
    expect(component.productForm.get('productPrice').value).toBe(null);
    expect(component.productForm.get('productDesc').value).toBe(null);
    expect(component.productForm.get('productUrl').value).toBe(null);
    expect(component.productForm.get('productCategory').value).toBe('Fiction');
  });

  it('should validate the description text area based on given condition', () => {
    fixture.detectChanges();    
    expect(component.formDescValidator(new FormControl('abcde'))).toEqual({'detailedDescError': true});    
    expect(component.formDescValidator(new FormControl('lasmdalsmdalmsdmdnlkasnfklasndsalkndflkndsldas'))).toEqual(null);
  });

  it('should validate the image url based on given format', () => {
    fixture.detectChanges();    
    expect(component.imageUrlValidator(new FormControl('abcde.com'))).toEqual({'invalidURLFormat': true});    
    expect(component.imageUrlValidator(new FormControl('https://abcde.jpg'))).toEqual(null);
  });

  it('should close form after close form button is clicked', () => {
    let item = {
      id: 1234,
      name: 'abc',
      price: 35,
      desc: 'salkndlknasd',
      image: 'https://image.jpg',
      cateory: 'Fiction',
      stockavailable: true
    };
    component.productItem = item;    
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#closeTheFormId');
    spyOn(component.closeForm, 'emit');
    button.click();
    fixture.detectChanges();
    expect(component.closeForm.emit).toHaveBeenCalledWith('edit');
    component.productItem = null;   
    button.click(); 
    fixture.detectChanges(); 
    expect(component.closeForm.emit).toHaveBeenCalledWith('new');
  });

});
