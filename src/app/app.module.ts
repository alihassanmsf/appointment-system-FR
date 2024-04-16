import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ServicesComponent } from './components/services/services.component';
import { AppointmentStatusesComponent } from './components/appointment-statuses/appointment-statuses.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HttpClient, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EditAppointmentDialogComponent } from './edit-appointment-dialog/edit-appointment-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditStatusDialogComponent } from './edit-status-dialog/edit-status-dialog.component';
import { EditCustomerDialogComponent } from './edit-customer-dialog/edit-customer-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditEmployeeDialogComponent } from './edit-employee-dialog/edit-employee-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { EditServiceDialogComponent } from './edit-service-dialog/edit-service-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    CustomersComponent,
    ServicesComponent,
    AppointmentStatusesComponent,
    AppointmentsComponent,
    EditAppointmentDialogComponent,
    EditStatusDialogComponent,
    EditCustomerDialogComponent,
    EditEmployeeDialogComponent,
    DashboardComponent,
    EditServiceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule
    
  ],
  entryComponents: [
    EditAppointmentDialogComponent // Add this if you're using Angular < 9
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
