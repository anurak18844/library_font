import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/service/book-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookForm!: FormGroup;

  books:any;
  currentBook: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล"

  constructor(private service: BookServiceService, private router: Router) { }

  ngOnInit(): void {
    this.statusBtnupdate = false;
    this.service.getBooks().subscribe((res)=>{
      this.books = res.data;
    });

    this.bookForm = new FormGroup({
      book_id: new FormControl(),
      name: new FormControl(),
      author: new FormControl(),
      publisher: new FormControl(),
      price: new FormControl()
    })
  }

  deleteBook(id:any){
    if(confirm("Confirm Delete??")){
      this.service.deleteBook(id).subscribe((res)=>{
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/book']));
      });
    }
  }
  
  btnEvent(){
    if(this.statusBtnupdate){
      // this.statusBtnupdate = false;
      // this.btnText = "เพิ่มข้อมูล";
      let book = {
        book_id: this.bookForm.value.book_id,
        name: this.bookForm.value.name,
        author: this.bookForm.value.author,
        publisher: this.bookForm.value.publisher,
        price: this.bookForm.value.price,
      }
  
      this.service.updateBook(book,this.currentBook._id).subscribe((res)=>{
        alert("UPDATE DATA");
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/book']));
        });

        // this.bookForm.reset();
    }else{
      let book = {
        book_id: this.bookForm.value.book_id,
        name: this.bookForm.value.name,
        author: this.bookForm.value.author,
        publisher: this.bookForm.value.publisher,
        price: this.bookForm.value.price,
      }
  
      this.service.addBook(book).subscribe((res)=>{
        alert("INSERT DATA");
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/book']));
      });
    }
  }

  editBook(id: any){
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getBookById(id).subscribe((res)=>{
     this.currentBook = res.data;
     this.bookForm.controls['book_id'].setValue(this.currentBook.book_id);
     this.bookForm.controls['name'].setValue(this.currentBook.name);
     this.bookForm.controls['author'].setValue(this.currentBook.author);
     this.bookForm.controls['publisher'].setValue(this.currentBook.publisher);
     this.bookForm.controls['price'].setValue(this.currentBook.price);
    });
  }

}
