import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from 'src/app/edit-employee-dialog/edit-employee-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  constructor(private _service: ApiService, public dialog: MatDialog) {}

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
