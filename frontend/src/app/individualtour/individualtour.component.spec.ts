import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualtourComponent } from './individualtour.component';

describe('IndividualtourComponent', () => {
  let component: IndividualtourComponent;
  let fixture: ComponentFixture<IndividualtourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualtourComponent]
    });
    fixture = TestBed.createComponent(IndividualtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
