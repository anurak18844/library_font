import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {
  private url = `${environment.serviceUrl}/staff`

  constructor(private http: HttpClient) { }

  getStaff(): any{
    return this.http.get<any>(this.url);
  }

  getStaffById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }


  register(staff: any){
    let getUrl = `${this.url}/register`;
    return this.http.post<any>(getUrl, staff)
      .pipe(map((res)=>{
        return res;
      }));
  }

  updateStaff(staff: any,id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.patch<any>(getUrl, staff)
      .pipe(map((res)=>{
        return res;
      }));
  }

  login(login: any){
    return this.http.post<any>(`${this.url}/login`, login)
    .pipe(map((res) => {
        return res;
    }));
}


}
