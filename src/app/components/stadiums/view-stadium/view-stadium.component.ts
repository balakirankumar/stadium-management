import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Stadium } from '../models/Stadium';
import { StadiumService } from '../stadium.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/service/Auth.Service';

@Component({
  selector: 'app-view-stadium',
  templateUrl: './view-stadium.component.html',
  styleUrls: ['./view-stadium.component.css']
})
export class ViewStadiumComponent implements OnInit, OnDestroy{

  stadium:any;
  paramsSubscription:any;
  isEditing:boolean = false;
  stadiumFormGoup:FormGroup= new FormGroup({});
  stadiumTypes = ['INDOOR','OUTDOOR','CLOSED'];
  stadiumName:any;
  isLoading:boolean = false;
  isError:boolean=false;
  message:string="";


  constructor(private router:Router, private route:ActivatedRoute, private stadiumService:StadiumService, private authService:AuthService) {
    
  }

  ngOnInit(): void {
    // let id = this.route.snapshot.params["id"]
    // console.log(id);
    // this.stadium = this.stadiumService.getStadiumById(id);
    this.paramsSubscription =this.route.queryParams.subscribe((params:Params)=>{
      this.getStadiumById(params["stadiumName"]);
    });
    this.stadiumFormGoup = new FormGroup({
      // stadiumName:new FormControl({value:this.stadium?.name,validators:[Validators.required, Validators.minLength(5),Validators.maxLength(30)],disabled:this.isEditing}),
      // stadiumType:new FormControl({value:INDOOR, validators:[ Validators.required],disabled:this.isEditing}),
      // location:new FormControl({value:this.stadium?.location,validators:[ Validators.required],disabled:this.isEditing}),
      // city:new FormControl({value:('') as any,validators:[ Validators.required],disabled:this.isEditing}),
      // state:new FormControl({value:('') as any,validators:[ Validators.required],disabled:this.isEditing}),
      // capacity:new FormControl({value:this.stadium?.capacity,validators:[ Validators.required,Validators.pattern(new RegExp("^[-]?[0-9]*$"))],disabled:this.isEditing})
      stadiumName:new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
          stadiumType:new FormControl('INDOOR', [ Validators.required]),
          location:new FormControl('',[ Validators.required]),
          city:new FormControl(('') as any,[]),
          state:new FormControl(('') as any,[ ]),
          imageUrl:new FormControl('',[ Validators.required]),
          capacity:new FormControl('',[ Validators.required,Validators.pattern(new RegExp("^[-]?[0-9]*$"))]),
      });

    this.stadiumFormGoup?.disable();
  }

  ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
  }

  getStadiumById(stadiumId:string){
    this.isLoading = true;
    this.stadiumService.getStadiumById(stadiumId).subscribe({
      next: (value: any)=>{
        if(value){
          this.stadium = value;
          this.stadiumFormGoup.patchValue({
            "stadiumName":value.name,
            "stadiumType":value.stadiumType, 
            "location":value.location,
            "city":'',
            "state":'',
            "imageUrl":value.imageUrl ? value.imageUrl : '',
            "capacity":value.capacity
          })
          this.isLoading= false;
          this.stadiumName = value.name;
        }
      },
      error: (error: any) =>{
        this.isLoading = false;
        this.message = error.error.error;
        this.isError=true
          console.log(error);
      }
    })
  }


  updateStadium($event:any){
    this.stadiumService.updateStadium(this.stadiumName, this.stadiumFormGoup.value).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.stadiumService.stadiumReload.next(true);
          this.router.navigate(["/stadiums"]);
        }
      },
      error: (errorRes) => {
        console.log(errorRes);
      },
    })
  }

  onDeleteStadium(){
    this.isLoading=true;
    this.stadiumService.deleteStadium(this.stadium.name).subscribe({
      next : value=>{
        console.log(value);
        this.isLoading=false;
        this.router.navigate(["/stadiums"]);
      },
      error: error =>{
        this.isLoading = false;

        console.log(error);

      }
    })

  }

  editStadium($event:any){
    this.isEditing = !this.isEditing;
    this.isEditing ? this.stadiumFormGoup?.enable() :this.stadiumFormGoup.disable();
  }

  isManager(){
    this.authService.isManager();
  }
}
