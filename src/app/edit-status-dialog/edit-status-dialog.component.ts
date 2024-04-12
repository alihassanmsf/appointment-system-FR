// src/app/edit-status-dialog/edit-status-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentStatus } from '../models/appointment-status.model';

@Component({
  selector: 'app-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  // styleUrls if necessary
})
export class EditStatusDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: AppointmentStatus }
  ) {
    // Create the form with the current status name
    this.editForm = this.fb.group({
      status: [data.status.status, Validators.required],
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.editForm.valid) {
      const updatedStatus: AppointmentStatus = {
        ...this.data.status,
        ...this.editForm.value,
      };

      this.dialogRef.close(updatedStatus);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
