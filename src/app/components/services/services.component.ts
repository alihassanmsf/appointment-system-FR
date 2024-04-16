// src/app/components/services/services.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';
import { Router } from '@angular/router';
import { EditServiceDialogComponent } from 'src/app/edit-service-dialog/edit-service-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  serviceForm: FormGroup;
  selectedService: Service | null = null;
  displayedColumns: string[] = ['name','price', 'actions'];
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.apiService.getServices().subscribe(services => this.services = services);
  }

  goToDashboard(): void {
    // Navigate back to the dashboard
    this.router.navigate(['/dashboard']);
  }
  onSubmit(): void {
    if (this.selectedService) {
      // If we're editing an existing service
      this.apiService.updateService({ ...this.selectedService, ...this.serviceForm.value })
        .subscribe(updatedService => {
          this.loadServices()
          // Replace the service in the services array
          const index = this.services.findIndex(s => s.id === updatedService.id);
          this.services[index] = updatedService;
          this.resetForm();
        });
    } else {
      // If we're adding a new service
      this.apiService.createService(this.serviceForm.value).subscribe(newService => {
        this.services.push(newService);
        this.resetForm();
      });
    }
  }

  editService(service: Service): void {
    const dialogRef = this.dialog.open(EditServiceDialogComponent, {
      width: '250px',
      data: service // Make sure 'service' contains 'id'
    });
  
    dialogRef.afterClosed().subscribe(updatedService => {
      if (updatedService) {
        this.apiService.updateService(updatedService).subscribe({
          next: () => this.loadServices(),
          error: err => console.error('Error updating service:', err),
        });
      }
    });
  }
  

  deleteService(serviceId: number): void {
    this.apiService.deleteService(serviceId).subscribe(() => {
      this.services = this.services.filter(service => service.id !== serviceId);
    });
  }

  resetForm(): void {
    this.serviceForm.reset();
    this.selectedService = null;
  }
}
