import { Injectable } from "@angular/core";
import { Stadium } from "./models/Stadium";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";



@Injectable()
export class StadiumService {

  stadiumReload:BehaviorSubject<boolean> = new BehaviorSubject(false);


    constructor(private httpClient:HttpClient){

    }
    stadiums:Stadium[] = [];

      getCurrentPageData(startIndex:number, endIndex:number){
        return this.stadiums.slice(startIndex, endIndex);
      }


      getStadiumManagersApprovals(){
        return this.httpClient.post("/system/stadium-managers/admin/approved",{});
      }



      getStadiumById(stadiumId:any):any{
        return this.httpClient.get("/system/getStadium/"+stadiumId)
      }


      getStadiumsFromSource(){
        return this.httpClient.get<Stadium[]>("/system/getStadiums");
      }

      updateStadium(stadiumName:any, data:any){
        data.name = data.stadiumName;
        delete data.stadiumName;
        return this.httpClient.put<Stadium>("/system/getStadium/"+stadiumName,data);
      }


      deleteStadium(stadiumId:any){
        return this.httpClient.delete<Stadium>("/system/deleteStadium/"+stadiumId,{responseType:('text') as any});
      }

      getStadiumMatchesFromSource(stadiumName:any){
        return this.httpClient.get("/system/schedule/stadium/"+stadiumName);
      }


      deleteStadiumMatchById(matchId:any){
        return this.httpClient.delete("/system/schedule/delete/"+matchId);
      }

      updateStadiumMatchById(isEdit:boolean, matchId:any, data:any){
        return isEdit ? this.httpClient.patch("/system/schedule/edit-schedule/"+matchId,data)
        : this.httpClient.post("/system/schedule/add",data);
      }

      bookTickets(stadiumId:any,data:any){
        return this.httpClient.post("/system/bookings/book/"+stadiumId+"?gameTitle=",data)
      }


      saveStadium(data:any){
        return this.httpClient.post<Stadium>("/system/addStadium",data,{responseType:'text' as any});
      }



}