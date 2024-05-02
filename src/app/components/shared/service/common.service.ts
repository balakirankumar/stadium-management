import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";




@Injectable()
export class CommonService {

    constructor(private _httpClient:HttpClient) {
        
    }

    updateMangagerStatus(form:any){
        return this._httpClient.put("system/stadium-managers/approve/"+form?.id,form,{responseType:'text'});
    }
    
}