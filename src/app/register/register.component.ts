import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^(\\+20|0)?1[0125]\\d{8}$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirmPassword: ['', Validators.required],
      addresses: this.fb.array([this.createAddressGroup()])
    }, { validators: this.passwordMatchValidator });
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      street: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]]
    });
  }

  get addresses(): FormArray {
    return this.reactiveForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);
    }
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }
}
