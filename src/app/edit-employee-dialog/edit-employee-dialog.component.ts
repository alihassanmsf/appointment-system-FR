// edit-employee-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  // styleUrls: ['./edit-employee-dialog.component.scss']
})
export class EditEmployeeDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: any }
  ) {
    this.form = this.fb.group({
      id: [data.employee.id, Validators.required], // Assuming your employee object has an 'id' field
      name: [data.employee.name, Validators.required],
      specialization: [data.employee.specialization, Validators.required],
    });
  }

  ngOnInit(): void {}

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
