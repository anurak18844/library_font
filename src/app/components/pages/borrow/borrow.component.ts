import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/service/book-service.service';
import { BorrowServiceService } from 'src/app/service/borrow-service.service';
import { MemberServiceService } from 'src/app/service/member-service.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {
  
  constructor(private memberService: MemberServiceService, private router: Router, private bookService: BookServiceService, private tokenStorage: TokenStorageService, private borrowService: BorrowServiceService) { }
  currentStaff: any;
  memberId: any;
  currentMember: any;
  currentBorrow: any;
  currentBook: any;
  memberForm!: FormGroup;
  bookForm!: FormGroup;
  borrows!: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล";
  ngOnInit(): void {
    this.borrowService.getAllBorrow().subscribe((res: any) => {
      this.borrows = res.data;
    });

    this.memberForm = new FormGroup({
      student_id: new FormControl(),
      name: new FormControl(),
    });

    this.bookForm = new FormGroup({
      book_id: new FormControl(),
      name: new FormControl(),
      borrow_id: new FormControl()
    });

  }

  searchMember(){
    this.memberService.getMemberByMemberId(this.memberForm.value.student_id).subscribe((res: any) => {
      this.currentMember = res.data;
      // console.log(this.currentMember.name);
      this.memberForm.controls['student_id'].setValue(this.currentMember.student_id);
      this.memberForm.controls['name'].setValue(this.currentMember.name);
    });
  }

  searchBook(){
    this.bookService.getBookByBookId(this.bookForm.value.book_id).subscribe((res: any) => {
      this.currentBook = res.data;
      // console.log(this.currentBook);
      this.bookForm.controls['book_id'].setValue(this.currentBook.book_id);
      this.bookForm.controls['name'].setValue(this.currentBook.name);
    });
  }

  btnEvent(){
    if(this.statusBtnupdate){
      this.currentStaff = this.tokenStorage.getUser();
      let receiver = {
            staff_id: this.currentStaff.staff_id,
            name: this.currentStaff.name
      }
      console.log(receiver);
      this.borrowService.returnBorrow( receiver, this.bookForm.value.borrow_id).subscribe((res)=>{
        alert("RETURN BOOK");
        // console.log(res);
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/borrow']));
        });
    }else{
      this.currentStaff = this.tokenStorage.getUser();
      // console.log(this.currentStaff.staff_id);
      console.log(this.memberForm);
      let borrow = {
        borrower:{
          student_id: this.memberForm.value.student_id,
          name: this.memberForm.value.name
        },
        book:{
          book_id: this.bookForm.value.book_id,
          name: this.bookForm.value.name,
        },
        lender:{
          staff_id: this.currentStaff.staff_id,
          name: this.currentStaff.name
        }
      }
      this.borrowService.addBorow(borrow).subscribe((res) => {
        alert("INSERT DATA");
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/borrow']));
      });
    }
  }

  editBorrow(id: any){

    this.statusBtnupdate = true;
    this.btnText = "รับคืนหนังสือ"

    this.borrowService.getBorrowbByid(id).subscribe((res) => {
        this.currentBorrow = res.data;
        console.log(this.currentBorrow);
        this.memberForm.controls['student_id'].setValue(this.currentBorrow.borrower.student_id);
        this.memberForm.controls['name'].setValue(this.currentBorrow.borrower.name);

        this.bookForm.controls['book_id'].setValue(this.currentBorrow.book.book_id);
        this.bookForm.controls['name'].setValue(this.currentBorrow.book.name);

        this.bookForm.controls['borrow_id'].setValue(this.currentBorrow._id);

    });
  }

  deleteBorrow(id:any){
    if (confirm("Confirm Delete??")) {
      this.borrowService.deleteBorrowById(id).subscribe((res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/borrow']));
      });
    }
  }

}
