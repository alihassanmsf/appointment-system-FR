import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AppointmentStatusesComponent } from './components/appointment-statuses/appointment-statuses.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'appointments/employees', component: EmployeesComponent },
  { path: 'appointments/schedule-appointment', component: AppointmentsComponent },
  { path: 'appointments/customers', component: CustomersComponent },
  { path: 'appointments/services', component: ServicesComponent },
  { path: 'appointments/appointment-statuses', component: AppointmentStatusesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'appointments/employees', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
