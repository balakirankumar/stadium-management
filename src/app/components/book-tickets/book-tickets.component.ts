import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from '../stadiums/stadium.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/service/Auth.Service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css'],
})
export class BookTicketsComponent implements OnInit {
  stadiumId: string = '';
  stadiumName: string = '';
  scheduleId: string = '';
  gameTitle: string = '';
  stadium: any = null;
  message: any = '';
  isError: boolean = false;
  isLoading: boolean = false;
  bookingFormGroup: FormGroup;
  seatTypes: string[] = ['SILVER', 'GOLD', 'PREMIUM'];
  currentUser: any;
  imageUrl:any;
  paymentFormGroup:FormGroup;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stadiumService: StadiumService,
    private authService:AuthService,
    private _location:Location
  ) {
    this.bookingFormGroup = new FormGroup({});
    this.paymentFormGroup = new FormGroup({});
    this.currentUser=undefined;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.stadiumId = value['id'];
    });
    this.activatedRoute.queryParams.subscribe((value) => {
      this.stadiumName = value['stadiumName'];
      this.scheduleId = value['scehduleId'];
      this.gameTitle = value['gameTitle'];
      this.imageUrl = value['image'];
    });
    this.currentUser = this.authService.getUser();
    this.bookingFormGroup = new FormGroup({
      stadiumName: new FormControl('', [Validators.required]),
      gameTitle: new FormControl('', [Validators.required]),
      customerEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      customerName: new FormControl('', [Validators.required]),
      seatType: new FormControl('', [Validators.required]),
      no_of_seats: new FormControl('', [Validators.required, Validators.pattern("^[1-6]{1}$")]),
    });
    this.checkStadiumExist(this.stadiumName);
    this.paymentFormGroup = new FormGroup({
      cardHolderName: new FormControl('',[Validators.required]),
      cardNumber:new FormControl('',[Validators.required, Validators.minLength(16),Validators.maxLength(16), Validators.pattern("^[0-9]{16}$")]),
      month:new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(2)]),
      year:new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(2)]),
      cvv:new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(3)])
    });
    this.paymentFormGroup.disable();
  }

  checkStadiumExist(stadiumName: any) {
    this.isLoading = true;

    this.stadiumService.getStadiumById(stadiumName).subscribe({
      next: (value: any) => {
        this.isLoading = false;
        this.stadium = value;
        this.bookingFormGroup.patchValue({
          stadiumName: this.stadium.name,
          gameTitle: this.gameTitle,
          customerEmail:this.currentUser.email,
          customerName:this.currentUser.name,
          seatType:'GOLD',
          no_of_seats:0
        });

        this.bookingFormGroup.get("customerEmail")?.disable();
        this.bookingFormGroup.get("stadiumName")?.disable();
        this.bookingFormGroup.get("gameTitle")?.disable();
        this.bookingFormGroup.get("customerName")?.disable();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.message = 'If came manualy here.Please check the stadium';
        this.isError = true;
        console.log(error);
      },
    });
  }

  goBack(){
    this._location.back();
  }

  goToBooking($event:any){
    this.paymentFormGroup.disable();
  }

  goToPayment($event:any){

    this.paymentFormGroup.enable();
    console.log(this.bookingFormGroup.getRawValue());
  }

  bookTickets(){
    let data = this.bookingFormGroup.getRawValue();
    data["scheduleId"] = this.scheduleId;
    this.stadiumService.bookTickets(this.stadiumId, data).subscribe({
      next: (value:any)=>{
        this.message = "Successfully booked"
        setTimeout(()=>{
          this.router.navigate(["/stadiums"+"/"+this.stadiumId +"/matches"],{queryParams:{stadiumName:this.stadiumName}})
        },2000)
      },
      error: (error:any)=>{
        this.message = "Somethng error occured!";
        this.isError =true;
      }
    })

  }
}
