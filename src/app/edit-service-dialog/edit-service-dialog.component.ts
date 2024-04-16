import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  // No styleUrls array if you're not using separate CSS
})
export class EditServiceDialogComponent {
  public editServiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public service: any
  ) {
    this.editServiceForm = this.fb.group({
      id: [this.service.id, Validators.required], // Ensure id is included and properly bound
      name: [this.service.name, Validators.required],
      price: [this.service.price, Validators.required]
    });
  }

  onSave(): void {
    this.dialogRef.close(this.editServiceForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
