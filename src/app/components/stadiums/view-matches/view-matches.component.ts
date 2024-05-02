import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/Auth.Service';
import { StadiumService } from '../stadium.service';
import { Pagination } from '../../shared/model/Pagination.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-matches',
  templateUrl: './view-matches.component.html',
  styleUrls: ['./view-matches.component.css'],
})
export class ViewMatchesComponent implements OnInit {
  matches: any=[];
  totalPages: number;
  pagination: Pagination;
  itemsPerPage: number = 9;
  isLoading: boolean = false;
  stadiumId:string="";
  message:string="";
  isError:boolean=false;
  stadiumName:any;


  constructor(
    private authService: AuthService,
    private stadiumService: StadiumService,
    private route: ActivatedRoute,
    private router:Router,
    private locationService:Location
  ) {
    this.totalPages = Math.ceil(
      this.matches.length / this.itemsPerPage
    );

    this.pagination = new Pagination(1, this.itemsPerPage, this.totalPages, []);
  }

  ngOnInit(): void {
    this.matches = this.getCurrentPageData();
    this.route.params.subscribe(value=>{
      this.stadiumId = value["id"];
    });
    
    this.route.queryParams.subscribe((value) => {
      this.stadiumName = value['stadiumName']
      this.getStadiumMatches(this.stadiumName);
    });
  }

  getStadiumMatches(stadiumName: string) {
    this.isLoading = true;
    this.stadiumService.getStadiumMatchesFromSource(stadiumName).subscribe({
      next: (value: any) => {
        console.log(value);
        this.isLoading = false;
        this.matches = value;
        this.pagination = new Pagination(1, this.itemsPerPage, this.totalPages, []);
      },
      error: (error: any) => {
        console.log(error);
        if(error.status == 404){
          this.message = "No matches found";
        }
        this.isLoading = false;
        this.isError = true;

      },
    });
  }

  getCurrentPageData() {
    const startIndex = (this.pagination.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.pagination.itemsPerPage,
      this.matches.length
    );
    this.matches = this.matches.slice(startIndex, endIndex);
    return this.matches;
  }

  gotoPrevious($event: any) {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.getCurrentPageData();
      return true;
    }
    return false;
  }

  gotoNext($event: any) {
    if (this.pagination.currentPage < this.totalPages) {
      this.pagination.currentPage++;
      this.getCurrentPageData();
      return true;
    }
    return false;
  }

  goBack(){
    this.locationService.back();
  }

  isManeger(){
    this.authService.isManager();
  }
}
