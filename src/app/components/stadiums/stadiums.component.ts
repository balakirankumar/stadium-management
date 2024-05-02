import { Component, OnInit } from '@angular/core';
import { Stadium } from './models/Stadium';
import { StadiumService } from './stadium.service';
import { Pagination } from '../shared/model/Pagination.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/service/Auth.Service';

@Component({
  selector: 'app-stadiums',
  templateUrl: './stadiums.component.html',
  styleUrls: ['./stadiums.component.css'],
})
export class StadiumsComponent implements OnInit{
  items:Stadium[]=[];
  totalPages: number;
  image_number = 1;
  pagination:Pagination;

  stadiumReloadSub:any;
  isLoading = false;
  stadiums:any=[];

  constructor(private stadiumService:StadiumService, private authService:AuthService){
    // this.items = [this.stadiumService.stadiums[0], this.stadiumService.stadiums[1]];
    this.totalPages= Math.ceil(this.stadiumService.stadiums.length / 2);
    this.pagination = new Pagination(1,2,this.totalPages, this.items);
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.image_number = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    },5000);
    
    this.getDataFromSource();

    this.stadiumReloadSub = this.stadiumService.stadiumReload.subscribe(next=>{
      if(next){
        this.getDataFromSource();
      }
    })
  }


  getDataFromSource(){
    this.isLoading = true;
    this.stadiumService.getStadiumsFromSource().subscribe({
      next: (res) => {
        if (res) {
          this.stadiums =res
          this.stadiumService.stadiums = res;
          this.isLoading=false;
          this.getCurrentPageData();
        }
      },
      error: (errorRes) => {
        console.log(errorRes);
      },
    });
  }

  getCurrentPageData(){
    this.totalPages= Math.ceil(this.stadiums.length / 2);
    const startIndex = (this.pagination.currentPage - 1) * 2;
    const endIndex = Math.min(startIndex + this.pagination.itemsPerPage, this.stadiums.length);
    this.items = this.stadiums.slice(startIndex, endIndex);
    return this.items;
  }

  gotoPrevious($event:any){
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.getCurrentPageData();
      return true;
    }
    return false;
  }

  gotoNext($event:any){
    if (this.pagination.currentPage < this.totalPages) {
      this.pagination.currentPage++;
      this.getCurrentPageData();
      return true;
    }
    return false;
  }

  isManager(){
    this.authService.isManager();
  }
}
