import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  private url = `${environment.serviceUrl}/member`
  constructor(private http: HttpClient) { }

  getMembers(): any{
    return this.http.get<any>(this.url);
  }

  getMemberById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  register(member: any){
    let getUrl = `${this.url}/register`;
    return this.http.post<any>(getUrl, member)
      .pipe(map((res)=>{
        return res;
      }));
  }

  editWholeMember(id: any, member: any){
    let getUrl = `${this.url}/${id}`;
    // console.log("this service: " + member.tel);
    return this.http.put<any>(getUrl, member)
      .pipe(map((res)=>{
        return res;
      }));
  }

  deleteMember(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  getMemberByMemberId(id: any){
    let getUrl = `${this.url}/id/${id}`;
    return this.http.get<any>(getUrl);
  }

}
