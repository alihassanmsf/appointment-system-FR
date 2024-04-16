import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditEmployeeDialogComponent } from 'src/app/edit-employee-dialog/edit-employee-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup; // Declare the FormGroup
  constructor(private _service: ApiService, public dialog: MatDialog,private router: Router,private _formBuilder: FormBuilder ) {
    this.employeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
    });
  }

  public employeesList: any[] = [];

  employees: any[] = [];
  employeeName: string = '';
  employeeSpecialization: string = '';
  displayedColumns: string[] = ['name', 'specialization', 'actions'];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this._service.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  // Method to navigate to the dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']); // Replace '/dashboard' with the path to your actual dashboard
  }
  addEmployee(): void {
    if (!this.employeeName || !this.employeeSpecialization) return;

    const newEmployee = {
      name: this.employeeName,
      specialization: this.employeeSpecialization, // Include specialization in the object
    };

    this._service.createEmployee(newEmployee).subscribe({
      next: () => {
        this.loadEmployees(); 
        this.employeeName = ''; 
        this.employeeSpecialization = ''; 
      },
      error: (error) => console.error('Error creating employee:', error),
    });
  }

  editEmployee(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '250px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (updatedEmployee) {
        this._service.updateEmployee(updatedEmployee).subscribe({
          next: () => this.loadEmployees(),
          error: err => console.error('Error updating employee:', err)
        });
      }
    });
  }

  deleteEmployee(employeeId: number): void {
    this._service.deleteEmployee(employeeId).subscribe({
      next: () => this.loadEmployees(),
      error: err => console.error('Error deleting employee:', err)
    });
  }
}
