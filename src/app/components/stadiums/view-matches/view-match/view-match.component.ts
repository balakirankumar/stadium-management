import { Component, OnInit } from '@angular/core';
import { StadiumService } from '../../stadium.service';
import { CommonService } from 'src/app/components/shared/service/common.service';
import { AuthService } from 'src/app/authentication/service/Auth.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-match',
  templateUrl: './view-match.component.html',
  styleUrls: ['./view-match.component.css']
})
export class ViewMatchComponent implements OnInit{

  isLoading:boolean = false;
  matchFormGroup:FormGroup= new FormGroup({});
  isEditFlow:boolean = false;
  stadiumId:any;
  matchId:any;
  message:string="";
  isError:boolean=false;
  stadiumName:string='';
  match:any;
  user:any;

  constructor(private stadiumService:StadiumService, private commonService:CommonService, private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute, private locationService:Location) {
    
  }

  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.activatedRoute.params.subscribe((value)=>{
      this.stadiumId = value["id"];
      this.matchId = value["matchId"];
    })
    this.activatedRoute.queryParams.subscribe(value=>{
      this.isEditFlow = value["editMode"] == "true" ? true :false;
      this.stadiumName = value["stadiumName"];
    });
    this.matchFormGroup = new FormGroup({
      stadiumName:new FormControl("",[Validators.required]),
      stadiumManagerEmail:new FormControl("",[Validators.required]),
      gameTitle: new FormControl("",[Validators.required]),
      no_of_teams:new FormControl("",[Validators.required]),
      no_of_players_in_team:new FormControl("",[Validators.required]),
      homeTeam:new FormControl("",[Validators.required]),
      awayTeam:new FormControl("",[Validators.required]),
      startTime:new FormControl("",[Validators.required]),
      endTime:new FormControl("",[Validators.required]),
      availableSeats:new FormControl("",[Validators.required]),
      imageUrl: new FormControl("",[Validators.required]),
    });
    if(this.isEditFlow){
      this.matchFormGroup.disable();
      this.getDataFillForm();
    } else {
      this.matchFormGroup.patchValue({
        stadiumName: this.stadiumName,
        stadiumManagerEmail : this.user.email
      })
      this.matchFormGroup.get("stadiumName")?.disable();
      this.matchFormGroup.get("stadiumManagerEmail")?.disable();
    }
  }

  getDataFillForm(){
    this.isLoading=true;
    this.stadiumService.getStadiumMatchesFromSource(this.stadiumName).subscribe({
      next: (value: any) => {
        this.isLoading = false;
        console.log(value);
        this.isLoading = false;
        if(Array.isArray(value)){
          value.forEach(v=>{
            if(v.id == this.matchId){
              this.match = v;
              this.matchFormGroup.patchValue({
                stadiumName:this.match.stadiumName,
                stadiumManagerEmail:this.match.stadiumManagerEmail,
                gameTitle:this.match.gameTitle,
                no_of_teams:this.match.no_of_teams,
                no_of_players_in_team:this.match.no_of_players_in_team,
                homeTeam:this.match.homeTeam,
                awayTeam:this.match.awayTeam,
                startTime:this.match.startTime,
                endTime:this.match.endTime,
                availableSeats:this.match.availableSeats,
                bookedSeats:this.match.bookedSeats,
                imageUrl:this.match.imageUrl
              });
            }
          });
        }
      },
      error: (error: any) => {
        console.log(error);
        if(error.status == 404){
          this.message = "No matches found";
          setTimeout(()=>{
            this.router.navigate(["/stadiums"]);
          },2000);
        }
        this.isError = true;

      },
    });
  }


  editMatch(){
    if(this.matchFormGroup.enabled){
      this.matchFormGroup.disable();
    }
    else {
      this.matchFormGroup.enable();
    }

    this.matchFormGroup.get("stadiumName")?.disable()
    
    this.matchFormGroup.get("stadiumManagerEmail")?.disable()
  }

  onDeleteMatch(){
    this.stadiumService.deleteStadiumMatchById(this.matchId).subscribe({
      next:(value)=>{

        this.router.navigate(["/stadiums"+"/"+this.stadiumId]);
      },
      error : (error)=>{

      }
    });
  }
  onUpdateOrCreate(){
    let data= this.matchFormGroup.getRawValue();
    data.startTime =  data.startTime+":00";
    data.endTime =  data.endTime+":00";
    this.stadiumService.updateStadiumMatchById(this.isEditFlow,this.matchId,data).subscribe({
      next: (value:any)=>{
        console.log(value);
        this.message = "Match scheduled successfully";
        this.isError=false;
      },
      error: (error:any)=>{
        console.log(error);

        this.message = error.error;
        this.isError = true;

      }
    });
  }

  isManager(){
    this.authService.isManager();
  }

  goBack(){
    this.locationService.back();
  }
}
