import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss']
})
export class EditCustomerDialogComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    this.editForm = this.fb.group({
      id: [data.id, Validators.required], // id might not be needed in the form but useful for update operation
      name: [data.name, Validators.required],
      contactNumber: [data.contactNumber, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSaveClick(): void {
    this.dialogRef.close(this.editForm.value);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
