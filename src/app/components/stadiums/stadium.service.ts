import { Injectable } from "@angular/core";
import { Stadium } from "./models/Stadium";
import { HttpClient } from "@angular/common/http";



@Injectable()
export class StadiumService {


    constructor(private httpClient:HttpClient){

    }

    stadiums:Stadium[] = [
        {
          id: '1',
          name: 'stadium4',
          type: 'INDOOR',
          location: 'India',
          capacity: 4000,
        },
        {
          id: '2',
          name: 'stadium2',
          type: 'OUTDOOR',
          location: 'India',
          capacity: 50000,
        },
        {
          id: '3',
          name: 'stadium4',
          type: 'CLOSED',
          location: 'India',
          capacity: 60000,
        },
        {
          id: '4',
          name: 'stadium2',
          type: 'INDOOR',
          location: 'India',
          capacity: 70000,
        },
        {
          id: '5',
          name: 'stadium4',
          type: 'INDOOR',
          location: 'India',
          capacity: 80000,
        },
        {
          id: '6',
          name: 'stadium2',
          type: 'INDOOR',
          location: 'India',
          capacity: 100000,
        },
        {
          id: '7',
          name: 'stadium4',
          type: 'INDOOR',
          location: 'India',
          capacity: 80000,
        },
        {
          id: '8',
          name: 'stadium2',
          type: 'INDOOR',
          location: 'India',
          capacity: 90000,
        },
        {
          id: '9',
          name: 'stadium4',
          type: 'INDOOR',
          location: 'India',
          capacity: 20000,
        },
        {
          id: '10',
          name: 'stadium2',
          type: 'INDOOR',
          location: 'India',
          capacity: 10000,
        },
        {
          id: '11',
          name: 'stadium4',
          type: 'INDOOR',
          location: 'India',
          capacity: 40000,
        },
        {
          id: '12',
          name: 'stadium2',
          type: 'INDOOR',
          location: 'India',
          capacity: 40000,
        },
        {
          id: '13',
          name: 'stadium2',
          type: 'INDOOR',
          location: 'India',
          capacity: 40000,
        },
      ];

      matches:any = [
        {
          "image":"image",
          "id": '1',
          "matchTitle":"Title ",
          "statdiumName": 'stadium4',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '2',
          "matchTitle":"Title ",
          "statdiumName": 'stadium3',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '3',
          "matchTitle":"Title ",
          "statdiumName": 'stadium2',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '4',
          "matchTitle":"Title ",
          "statdiumName": 'stadium1',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '1',
          "matchTitle":"Title ",
          "statdiumName": 'stadium4',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '2',
          "matchTitle":"Title ",
          "statdiumName": 'stadium3',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '3',
          "matchTitle":"Title ",
          "statdiumName": 'stadium2',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '4',
          "matchTitle":"Title ",
          "statdiumName": 'stadium1',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '1',
          "matchTitle":"Title ",
          "statdiumName": 'stadium4',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '2',
          "matchTitle":"Title ",
          "statdiumName": 'stadium3',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '3',
          "matchTitle":"Title ",
          "statdiumName": 'stadium2',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "start_date": new Date(""),
          "total_tickets":5000
        },
        {
          "image":"image",
          "id": '4',
          "matchTitle":"Title ",
          "statdiumName": 'stadium1',
          "team_1":"RCB",
          "team_2":"MI",
          "closed_tickets":3000,
          "open_tickets":2000,
          "total_tickets":5000
        },
      ]

      getCurrentPageData(startIndex:number, endIndex:number){
        return this.stadiums.slice(startIndex, endIndex);
      }


      getStadiumMatches(stadiumId:any,startIndex:number, endIndex:number ){
        return this.matches.slice(startIndex,endIndex);
      }



      getStadiumById(stadiumId:any):Stadium{
        return  this.stadiums[this.stadiums.findIndex( stadium =>{
            if(stadium.id == stadiumId){
                return true
            }
            return false;
        })];
      }


      getStadiumsFromSource(){
        this.httpClient.get<Stadium[]>("/system/getStadiums").subscribe({
          next: (res) => {
            if (res) {
              this.stadiums =res
            }
          },
          error: (errorRes) => {
            console.log(errorRes);
          },
        });
      }



}