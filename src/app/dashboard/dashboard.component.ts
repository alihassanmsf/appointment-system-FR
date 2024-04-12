// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalEmployees!: number;
  totalCustomers!: number;
  totalAppointments!: number;
  // More stats as needed

  constructor(private apiService: ApiService, private router: Router) {}

  summaryStats = [
    { title: 'Total Employees', value: 0 },
    { title: 'Total Customers', value: 0 },
    { title: 'Total Appointments', value: 0 },
    // ... add more stats as needed ...
  ];
  recentActivities = [
    // Populate with actual recent activities
  ];
  alerts = [
    // Populate with actual alerts
  ];

  ngOnInit(): void {
    this.loadSummaryData();
  }

  loadSummaryData(): void {
    // Fetch total employees
    this.apiService.getEmployees().subscribe((employees) => {
      this.totalEmployees = employees.length; // Update the totalEmployees property
      this.updateSummaryStat('Total Employees', this.totalEmployees); // Update the summaryStats array
    });

    // Fetch total customers
    this.apiService.getCustomers().subscribe((customers) => {
      this.totalCustomers = customers.length; // Update the totalCustomers property
      this.updateSummaryStat('Total Customers', this.totalCustomers); // Update the summaryStats array
    });

    // Fetch total appointments and other stats similarly...

    this.apiService.getAppointments().subscribe((appointments) => {
      this.totalCustomers = appointments.length; // Update the totalCustomers property
      this.updateSummaryStat('Total Appointments', this.totalCustomers); // Update the summaryStats array
    });
  }

  private updateSummaryStat(title: string, value: number): void {
    const index = this.summaryStats.findIndex(stat => stat.title === title);
    if (index !== -1) {
      this.summaryStats[index].value = value; // Update the value property of the stat
    }
  }
navigate(stat: { title: string, value: number }): void {
    switch (stat.title) {
      case 'Total Employees':
        this.router.navigate(['appointments/employees']);
        break;
      case 'Total Customers':
        this.router.navigate(['appointments/customers']);
        break;
      case 'Total Appointments':
        this.router.navigate(['appointments/schedule-appointment']);
        break;
      // Add additional cases for other stats as needed
    }
  }

  // Example quick action function
  navigateToAddEmployee(): void {
    this.router.navigate(['/employees']); // Assuming you have routing set up
  }
  navigateToAddCustomer(): void {
    this.router.navigate(['/customers/add']); // Update with your actual route
  }

  navigateToScheduleAppointment(): void {
    this.router.navigate(['/appointments/schedule']); // Update with your actual route
  }
}
