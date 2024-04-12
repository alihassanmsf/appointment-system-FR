import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../models/appointment.model';
import { Employee } from '../models/employee.model';
import { Customer } from '../models/customer.model';
import { Service } from '../models/service.model';
import { AppointmentStatus } from '../models/appointment-status.model';

// Make sure you're fetching these lists from the backend or a state management store
const EMPLOYEES: Employee[] = [
  /* ... */
];
const CUSTOMERS: Customer[] = [
  /* ... */
];
const SERVICES: Service[] = [
  /* ... */
];
const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  /* ... */
];

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  // styleUrls if necessary...
})
export class EditAppointmentDialogComponent implements OnInit {
  editForm: FormGroup;
  employees = EMPLOYEES;
  customers = CUSTOMERS;
  services = SERVICES;
  appointmentStatuses = APPOINTMENT_STATUSES;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      appointment: Appointment;
      employees: any[];
      customers: any[];
      services: any[];
      status: any[];
    }
  ) {
    this.employees = data.employees;
    this.customers = data.customers;
    this.services = data.services;
    this.appointmentStatuses = data.status;
    this.editForm = this.fb.group({
      appointmentDate: [data.appointment.appointmentDate, Validators.required],
      employeeId: [data.appointment.employeeId, Validators.required],
      customerId: [data.appointment.customerId, Validators.required],
      serviceId: [data.appointment.serviceId, Validators.required],
      appointmentStatusId: [
        data.appointment.appointmentStatusId,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.editForm.valid) {
      const updatedAppointment: Appointment = {
        ...this.data.appointment,
        ...this.editForm.value,
      };
      this.dialogRef.close(updatedAppointment);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
