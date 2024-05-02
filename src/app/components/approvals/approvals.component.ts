import { Component, OnInit } from '@angular/core';
import { StadiumService } from '../stadiums/stadium.service';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit{

  managers:any=[];
  isLoading:boolean =false;
  isError:boolean = false;
  message:any = "";

  constructor(private stadiumService:StadiumService, private commonService:CommonService) {
    
  }
  
  
  ngOnInit(): void {
    this.fetchData();
  }


  fetchData() {
    this.isLoading = true;
    this.stadiumService.getStadiumManagersApprovals().subscribe({
      next: res=>{
        this.isLoading=false;
          this.managers = Array.isArray(res) ? res :[];
      },
      error: error=>{
        this.isError =!this.isError;
        this.message = "Error while Fetching data ."
        console.log(error);

      }
    });
  }


  updateStatus(row:any, status:boolean){

    row.approved = status
    this.commonService.updateMangagerStatus(row).subscribe({
      next: value=>{

        this.message = value;
        this.fetchData();
      },
      error: error=>{
        this.message = "Error updating the status";
        this.isError = true;
      }
    })
  }

}
