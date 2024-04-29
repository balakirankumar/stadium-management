import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/service/Auth.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'stadium-ceat-bookings';

  constructor(private authService:AuthService, private route:Router) {
    
  }


  ngOnInit(): void {

    if(!this.authService.loggedIn){
      this.route.navigate(["/login"]);
    }
    else {

    }
  }

}
