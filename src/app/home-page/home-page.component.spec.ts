import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain proper home page contents', () => {    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.action-button-title')?.textContent).toContain('SHOβRIDGE');
    expect(compiled.querySelector('.action-button-text')?.textContent).toContain('Click the action buttons below to view or modify inventory');
    expect(compiled.querySelector('.btn-view')?.textContent).toContain('View Inventory');
    expect(compiled.querySelector('.btn-modify')?.textContent).toContain('Modify Inventory');
    expect(compiled.querySelector('.app-image')).toBeTruthy();
  });

});
