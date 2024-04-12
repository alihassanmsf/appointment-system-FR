import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatusesComponent } from './appointment-statuses.component';

describe('AppointmentStatusesComponent', () => {
  let component: AppointmentStatusesComponent;
  let fixture: ComponentFixture<AppointmentStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentStatusesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
