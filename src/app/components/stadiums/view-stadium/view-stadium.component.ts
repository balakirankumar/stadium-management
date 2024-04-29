import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Stadium } from '../models/Stadium';
import { StadiumService } from '../stadium.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor(private router:Router, private route:ActivatedRoute, private stadiumService:StadiumService, private _fb:FormBuilder) {
    
  }

  ngOnInit(): void {
    // let id = this.route.snapshot.params["id"]
    // console.log(id);
    // this.stadium = this.stadiumService.getStadiumById(id);
    this.paramsSubscription =this.route.params.subscribe((params:Params)=>{
      this.stadium = this.stadiumService.getStadiumById(params["id"]);
    })
    let INDOOR:any = "INDOOR"
    this.stadiumFormGoup = new FormGroup({
      // stadiumName:new FormControl({value:this.stadium?.name,validators:[Validators.required, Validators.minLength(5),Validators.maxLength(30)],disabled:this.isEditing}),
      // stadiumType:new FormControl({value:INDOOR, validators:[ Validators.required],disabled:this.isEditing}),
      // location:new FormControl({value:this.stadium?.location,validators:[ Validators.required],disabled:this.isEditing}),
      // city:new FormControl({value:('') as any,validators:[ Validators.required],disabled:this.isEditing}),
      // state:new FormControl({value:('') as any,validators:[ Validators.required],disabled:this.isEditing}),
      // capacity:new FormControl({value:this.stadium?.capacity,validators:[ Validators.required,Validators.pattern(new RegExp("^[-]?[0-9]*$"))],disabled:this.isEditing})
      stadiumName:new FormControl(this.stadium.name,[Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
      stadiumType:new FormControl(INDOOR, [ Validators.required]),
      location:new FormControl(this.stadium.location,[ Validators.required]),
      city:new FormControl(('') as any,[ Validators.required]),
      state:new FormControl(('') as any,[ Validators.required]),
      capacity:new FormControl(this.stadium.capacity,[ Validators.required,Validators.pattern(new RegExp("^[-]?[0-9]*$"))])
    });

    this.stadiumFormGoup?.disable();
  }

  ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
  }


  updateStadium($event:any){
    console.log(this.stadiumFormGoup.value);
  }

  editStadium($event:any){
    this.isEditing = !this.isEditing;
    this.isEditing ? this.stadiumFormGoup?.enable() :this.stadiumFormGoup.disable();
  }

}
