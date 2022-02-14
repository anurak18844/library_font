import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private url = `${environment.serviceUrl}/category`
  constructor(private http: HttpClient) { }

  getCategories(): any{
    return this.http.get<any>(this.url);
  }

  getCategoryById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  addCategory(category: any){
    return this.http.post<any>(this.url, category)
      .pipe(map((res)=>{
        return res;
      }));
  }

  updateCategory(category: any,id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl, category)
      .pipe(map((res)=>{
        return res;
      }));
  }

  deleteCategory(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  getCategoryByCategoryId(id: any){
    let getUrl = `${this.url}/id/${id}`;
    return this.http.get<any>(getUrl);
  }

}
