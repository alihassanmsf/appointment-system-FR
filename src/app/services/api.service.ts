import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { AppointmentStatus } from '../models/appointment-status.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'https://localhost:7220/api';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Appointments
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/appointments`);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/appointments/${id}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/appointments`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.BASE_URL}/appointments/${appointment.id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }

  // Employees
  getEmployees(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/employees`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/employees/${id}`);
  }

  createEmployee(employee: any): Observable<any> {
    console.log('Sending request with body:', employee);
    return this.http.post(`${this.BASE_URL}/employees`, JSON.stringify(employee), { headers: this.headers });
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/employees/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/employees/${employeeId}`);
  }

  // Customers
  getCustomers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/customers`);
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/customers/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/customers`, customer);
  }

  updateCustomer(customer: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/customers/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/customers/${id}`);
  }

  // Services
  getServices(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/services`);
  }

  getServiceById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/services/${id}`);
  }

  createService(service: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/services`, service);
  }

  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.BASE_URL}/services/${service.id}`, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/services/${id}`);
  }

  // Appointment Statuses
  getAppointmentStatuses(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/appointmentStatuses`);
  }

  getAppointmentStatusById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/appointmentStatuses/${id}`);
  }

  createAppointmentStatus(appointmentStatus: any): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/appointmentStatuses`,
      appointmentStatus
    );
  }

  updateAppointmentStatus(status: AppointmentStatus): Observable<AppointmentStatus> {

    return this.http.put<AppointmentStatus>(`${this.BASE_URL}/appointmentStatuses/${status.id}`, status);
  }

  deleteAppointmentStatus(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointmentStatuses/${id}`);
  }
}
