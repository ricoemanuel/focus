import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarVertComponent } from './nav-bar-vert.component';

describe('NavBarVertComponent', () => {
  let component: NavBarVertComponent;
  let fixture: ComponentFixture<NavBarVertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarVertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarVertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
