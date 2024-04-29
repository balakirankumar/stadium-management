import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/service/Auth.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;
  userSub: any;
  isAuthenticated:boolean=false;
  isError:boolean= false;
  user:any;

  constructor(private authService:AuthService, private _fb:FormBuilder, private route:Router){
    this.loginFormGroup = new FormGroup({});
  }


  ngOnInit(): void {
    let userFirst = this.authService.getUser()

    if(userFirst!=null){
      this.user = userFirst;
      this.authService.user.next(userFirst);
      this.route.navigate(["/home"]);
    }
    this.loginFormGroup = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      rememberMe:new FormControl(false)
    });
    this.userSub = this.authService.user.subscribe((user)=>{
      if(user){
        this.user=user;
      }
    });
  }


  onLogin(){
    if(this.authService.login(this.loginFormGroup.value)){
     this.isAuthenticated = true;
     this.route.navigate(["/home"]);
    }
    this.isError =true;
  }
}
