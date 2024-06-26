import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EditCustomerDialogComponent } from 'src/app/edit-customer-dialog/edit-customer-dialog.component';
import { Customer } from 'src/app/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customerForm: FormGroup;
  customers: any[] = [];
  displayedColumns: string[] = ['name', 'contactNumber', 'actions'];

  constructor(
    private _service: ApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this._formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]], // Regex for international phone number
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this._service.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => console.error('There was an error!', error)
    });
  }

  addCustomer(): void {
    if (this.customerForm.invalid) return;

    const newCustomer = this.customerForm.value;

    this._service.createCustomer(newCustomer).subscribe({
      next: () => {
        this.loadCustomers();
        this.customerForm.reset();
      },
      error: (error) => console.error('Error creating customer:', error)
    });
  }

  editCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
      width: '250px',
      data: customer // Pass the customer to be edited
    });
  
    dialogRef.afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {
        this._service.updateCustomer(updatedCustomer).subscribe({
          next: () => this.loadCustomers(),
          error: err => console.error('Error updating customer:', err),
        });
      }
    });
  }
  
  deleteCustomer(customerId: number): void {
    console.log('Deleting customer with ID:', customerId);
    // Implement deletion logic, perhaps with a confirmation dialog
    // After deletion, refresh the customers list
    this._service.deleteCustomer(customerId).subscribe({
      next: () => this.loadCustomers(),
      error: (error) => console.error('Error deleting customer:', error),
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']); // Ensure the route is correct
  }
}
