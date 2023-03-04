import { Output } from '@angular/core';
import { Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/Customer';
import { LoginService } from '../service/login.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  profileForm:FormGroup;
  empl:User|undefined;
  employee = {} as User;




  constructor (private fb: FormBuilder,private _snackBar: MatSnackBar,private customer:RegistrationService ,private router: Router,private log:LoginService){
    this.profileForm = this.fb.group({

      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      email:new FormControl('',[Validators.required ,Validators.required, Validators.pattern(/^[a-zA-Z0-9.! #$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.com$/)]),
      phoneNo:new FormControl('',[Validators.required,Validators.pattern(/^[7-9]\d{9}$/),Validators.minLength(10)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      userId:new FormControl('',[Validators.required,Validators.minLength(3)]),



    },{Validators:[this.checkIfEmailsAreValid]});
   }



  openSnack() {

    this._snackBar.open('Feedback submitted successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })

  }
  get name(){
    return this.profileForm.get("name");
  }

  get email(){
    return this.profileForm.get("email");
  }
  get password(){
    return this.profileForm.get("password");
  }
  get userId(){
    return this.profileForm.get("userId");
  }


  get phoneNo(){
    return this.profileForm.get("phoneNo");
  }


  @Output()
  addEmployee:EventEmitter<User>=new EventEmitter<User>();

  user={

  }







  checkIfEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}\.com)$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { checkIfGuestEmailsAreValid: false }
      }
    }
    return null;
  }




  onSubmit() {
    if (this.profileForm.invalid) {
      alert('One or more fields are required');
      return;
    }

    this.customer.createEmployee(this.profileForm.value).subscribe(
      data => {
        console.log(data);
        this._snackBar.open('Registration completed successfully', 'Close');
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }



  // saveEmployee(){

  //   this.employee!.name=this.profileForm.controls['name'].value;
  //   this.employee!.email=this.profileForm.controls['email'].value;
  //   this.employee!.phoneNo=this.profileForm.controls['phoneNo'].value;
  //   this.employee!.password=this.profileForm.controls['password'].value;
  //   this.employee!.userId=this.profileForm.controls['userId'].value;
  //   this.customer.createEmployee(this.employee!).subscribe(
  //     data => {
  //       console.log(data);
  //       this.goToEmployee();
  //     },

  //     error => console.log(error)
  //   );

  // }

  // goToEmployee(){

  //   this.router.navigate(['/login']);
  // }

  // onSubmit(){


  //   alert("Registration completed successfully");

  //   this.saveEmployee();
  //   this.profileForm.reset();
  //   this._snackBar.open('Feedback submitted successfully', 'success', {​
  //     duration: 5000,​
  //     panelClass: ['mat-toolbar', 'mat-primary']​
  //     })

  // }
  // register(){

  //   console.log(this.profileForm.value);
  //   if (this.employee.name=='' && this.employee.email && this.employee.phoneNo==''&& this.employee.password==''&&this.employee.userId) {

  //     alert('one or more fields are required');


  //   }else{

  //     alert('successfully signed up');

  //     this.router.navigate(['/login']);

  //   }

  //   this._snackBar.open('Feedback submitted successfully', 'success', {​
  //     duration: 5000,​
  //     panelClass: ['mat-toolbar', 'mat-primary']​
  //     })



  // }




}

// onSubmit() {
//   if (!this.profileForm.controls['name'].value) {
//     alert('Name field is required');
//     return;
//   }

//   if (!this.profileForm.controls['email'].value) {
//     alert('Email field is required');
//     return;
//   }

//   if (!this.profileForm.controls['phoneNo'].value) {
//     alert('Phone number field is required');
//     return;
//   }

//   if (!this.profileForm.controls['password'].value) {
//     alert('Password field is required');
//     return;
//   }

//   if (!this.profileForm.controls['userId'].value) {
//     alert('User ID field is required');
//     return;
//   }

//   alert('Registration completed successfully');
//   this.saveEmployee();
//   this.profileForm.reset();
//   this.router.navigate(['/login']);
// }

