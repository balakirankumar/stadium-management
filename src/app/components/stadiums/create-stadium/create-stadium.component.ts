import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from '../stadium.service';

@Component({
  selector: 'app-create-stadium',
  templateUrl: './create-stadium.component.html',
  styleUrls: ['./create-stadium.component.css']
})
export class CreateStadiumComponent implements OnInit{


  stadiumFormGoup:FormGroup= new FormGroup({});
  stadiumTypes = ['INDOOR','OUTDOOR','CLOSED'];
  isLoading:boolean = false;
  isError:boolean=false;
  message:string="";


  constructor(private router:Router, private route:ActivatedRoute, private stadiumService:StadiumService, private _fb:FormBuilder) {
    
  }

  ngOnInit(): void {

    this.stadiumFormGoup = new FormGroup({
      name:new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
          stadiumType:new FormControl('INDOOR', [ Validators.required]),
          location:new FormControl('',[ Validators.required]),
          city:new FormControl(('') as any,[]),
          state:new FormControl(('') as any,[ ]),
          imageUrl:new FormControl('',[ Validators.required]),
          capacity:new FormControl('',[ Validators.required,Validators.pattern(new RegExp("^[0-9]*$"))]),
      });
      
  }

  saveStadium(){

    this.stadiumService.saveStadium(this.stadiumFormGoup.value).subscribe({
      next: (value:any)=>{
        console.log(value);
        this.router.navigate(["/stadiums"]);
      },
      error: (error:any)=>{
        console.log(error);
        this.isError=true;
        this.message="Creating of stadium has failed";
      }
    })

  }

}
