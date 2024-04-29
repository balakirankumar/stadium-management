import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/service/Auth.Service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpFormGroup:any;

  constructor(private authService:AuthService, private route:Router){

  }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.minLength(1), Validators.maxLength(10)]),
      lastName:new FormControl('',[Validators.required,Validators.minLength(1), Validators.maxLength(10)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      country:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(10), Validators.maxLength(20)]),
      agree:new FormControl('',[Validators.requiredTrue])
    });
  }

  onSignUp(){
    console.log(this.signUpFormGroup.value);
    this.route.navigate(["/login"])
  }
}
