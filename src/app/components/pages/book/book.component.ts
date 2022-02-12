import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/service/book-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books:any;
  constructor(private service: BookServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.getBooks().subscribe((res)=>{
      this.books = res.data;
    });
  }

  deleteBook(id:any){
    if(confirm("Confirm Delete??")){
      this.service.deleteBook(id).subscribe((res)=>{
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/book']));
      });
    }
  }

}
