import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/Auth.Service';
import { StadiumService } from '../stadium.service';
import { Pagination } from '../../shared/model/Pagination.model';

@Component({
  selector: 'app-view-matches',
  templateUrl: './view-matches.component.html',
  styleUrls: ['./view-matches.component.css']
})
export class ViewMatchesComponent implements OnInit{

  matches:any;
  totalPages: number;
  pagination:Pagination;
  itemsPerPage:number =10;


  constructor(private authService:AuthService, private stadiumService:StadiumService){

    this.totalPages= Math.ceil(this.stadiumService.matches.length / this.itemsPerPage);
    
    this.pagination = new Pagination(1,this.itemsPerPage,this.totalPages,[]);
  }

  ngOnInit(): void {
    this.matches = this.getCurrentPageData();
  }

  getCurrentPageData(){
    const startIndex = (this.pagination.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.pagination.itemsPerPage, this.stadiumService.matches.length);
    this.matches = this.stadiumService.matches.slice(startIndex, endIndex);
    return this.matches;
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

}
