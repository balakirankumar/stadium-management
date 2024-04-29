import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/service/Auth.Service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  userSub:any;
  userObject:any=null;
  loggedIn:boolean;
  constructor(private authService:AuthService, private route:Router){
    this.loggedIn = false;

  }

  ngOnInit(): void {
      this.userSub =  this.authService.user.subscribe((user)=>{
        if(user){
          this.userObject = user;
          this.loggedIn = true;
        }
        else{
          this.userObject = null;
          this.loggedIn = false;
        }
      });
  }


  onLogout() {
    this.authService.logout();
    this.loggedIn = false;
    this.route.navigate(["/login"]);
  }


}
