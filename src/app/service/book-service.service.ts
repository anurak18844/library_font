import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private url = `${environment.serviceUrl}/book` //Alt+96 = ``
  constructor(private http: HttpClient) { }

  getBooks(){
    let getUrl = `${this.url}`;
    return this.http.get<any>(getUrl);
  }

  getBookById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  deleteBook(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  addBook(book: any){
    let getUrl = `${this.url}`;
    return this.http.post<any>(getUrl,book)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updateBook(book: any, id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,book)
    .pipe(map((res)=>{
      return res;
    }))
  }

  getBookByBookId(id: any){
    let getUrl = `${this.url}/id/${id}`;
    return this.http.get<any>(getUrl);
  }
}
