import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditStatusDialogComponent } from 'src/app/edit-status-dialog/edit-status-dialog.component';
import { AppointmentStatus } from 'src/app/models/appointment-status.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-appointment-statuses',
  templateUrl: './appointment-statuses.component.html',
  styleUrls: ['./appointment-statuses.component.scss'],
})
export class AppointmentStatusesComponent implements OnInit {
  // appointmentStatuses!: Observable<any[]>;
  appointmentStatuses: AppointmentStatus[] = [];
  appointmentStatusName: string = '';
  displayedColumns: string[] = ['status','actions'];
  constructor(private _service: ApiService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAppointmentStatuses();
  }

  loadAppointmentStatuses(): void {
    this._service.getAppointmentStatuses().subscribe({
      next: (data) => {
        this.appointmentStatuses = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  
  addAppointmentStatus(): void {
    if (!this.appointmentStatusName) return;

    const newStatus = {
      status: this.appointmentStatusName,
    };

    this._service.createAppointmentStatus(newStatus).subscribe({
      next: () => {
        this.loadAppointmentStatuses(); 
        this.appointmentStatusName = ''; 
      },
      error: (error) =>
        console.error('Error creating appointment status:', error),
    });
  }

  editAppointmentStatus(status: AppointmentStatus): void {
    const dialogRef = this.dialog.open(EditStatusDialogComponent, {
      width: '250px',
      data: { status }
    });

    dialogRef.afterClosed().subscribe(updatedStatus => {
      if (updatedStatus) {
        this._service.updateAppointmentStatus(updatedStatus).subscribe({
          next: (response) => {
            // Replace in the local array or reload from server
            const index = this.appointmentStatuses.findIndex(s => s.id === updatedStatus.id);
            if (index !== -1) {
              this.appointmentStatuses[index] = updatedStatus;
            }
            this.loadAppointmentStatuses();
          },
          error: err => console.error('Error updating status:', err)
        });
      }
    });
  }

  deleteAppointmentStatus(statusId: number): void {
    this._service.deleteAppointmentStatus(statusId).subscribe({
      next: () => {
        this.appointmentStatuses = this.appointmentStatuses.filter(s => s.id !== statusId);
      },
      error: err => console.error('Error deleting status:', err)
    });
  }

  
}
