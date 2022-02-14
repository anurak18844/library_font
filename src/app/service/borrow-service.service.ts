import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowServiceService {
  private url = `${environment.serviceUrl}/borrow`
  constructor(private http: HttpClient) { }

  getAllBorrow(): any{
    return this.http.get<any>(this.url);
  }

  getBorrowbByid(id: any){
    let getUrl = `${this.url}/id/${id}`;
    return this.http.get<any>(getUrl);
  }

  addBorow(borrow: any){
    return this.http.post<any>(this.url, borrow)
      .pipe(map((res)=>{
        return res;
      }));
  }

  returnBorrow(borrow: any,id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.patch<any>(getUrl, borrow)
      .pipe(map((res)=>{
        return res;
      }));
  }

  deleteBorrowById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }


}
