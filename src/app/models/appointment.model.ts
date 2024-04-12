// src/app/models/appointment.model.ts

import { Employee } from './employee.model';
import { Customer } from './customer.model';
import { Service } from './service.model';
import { AppointmentStatus } from './appointment-status.model';

export interface Appointment {
  id: number;
  appointmentDate: string;
  employeeId: number;
  employee: Employee;
  customerId: number;
  customer: Customer;
  serviceId: number;
  service: Service;
  appointmentStatusId: number;
  appointmentStatus: AppointmentStatus;
}
