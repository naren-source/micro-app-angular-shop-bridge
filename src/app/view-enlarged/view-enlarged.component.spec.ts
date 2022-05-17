import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnlargedComponent } from './view-enlarged.component';

describe('ViewEnlargedComponent', () => {
  let component: ViewEnlargedComponent;
  let fixture: ComponentFixture<ViewEnlargedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEnlargedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnlargedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create view-enlarged component', () => {    
    expect(component).toBeTruthy();
  });

  it('should contain proper enlarged item contents', () => {    
    component.item = {
      id: 1234,
      name: 'abc',
      price: 35,
      desc: 'salkndlknasd',
      image: 'https://image.jpg',
      cateory: 'Fiction',
      stockavailable: true
    };
    const compiled = fixture.nativeElement as HTMLElement;    
    fixture.detectChanges();
    expect(compiled.querySelector('.card-title')?.innerHTML).toContain(component.item.name);
    expect(compiled.querySelector('.card-subtitle')?.textContent).toContain(component.item.cateory);
    expect(compiled.querySelector('.card-text')?.textContent).toContain(component.item.desc);
    expect(compiled.querySelector('.card-footer')?.textContent).toContain(`Price: ₹${component.item.price}`);
  });


});
