import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanpageComponent } from './planpage.component';

describe('PlanpageComponent', () => {
  let component: PlanpageComponent;
  let fixture: ComponentFixture<PlanpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanpageComponent]
    });
    fixture = TestBed.createComponent(PlanpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
