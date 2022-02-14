import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { MemberServiceService } from 'src/app/service/member-service.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  memberForm!: FormGroup;

  members: any;
  categories: any;
  currentCategory: any;
  currentMember: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล";


  constructor(private service: MemberServiceService, private categoryService: CategoryServiceService, private router: Router) { }

  ngOnInit(): void {

    this.statusBtnupdate = false;

    this.service.getMembers().subscribe((res: any) => {
      this.members = res.data;
    });

    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });

    this.memberForm = new FormGroup({
      student_id: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      tel: new FormControl(),
      group_learning: new FormControl(),
      address: new FormControl(),
      category: new FormControl()
    });
  }

  deleteMember(id: any) {
    if (confirm("Confirm Delete??")) {
      this.service.deleteMember(id).subscribe((res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/member']));
      });
    }
  }

  btnEvent() {
    if (this.statusBtnupdate) {

      this.categoryService.getCategoryById(this.memberForm.value.category).subscribe((res: any) => {
        this.currentCategory = res.data;
        console.log(res.data);

        let member = {
          student_id: this.memberForm.value.student_id,
          name: this.memberForm.value.name,
          tel: this.memberForm.value.tel,
          group_learning: this.memberForm.value.group_learning,
          address: this.memberForm.value.address,
          category: {
            category_id: this.currentCategory.category_id,
            name: this.currentCategory.name,
            day_can_borrow: this.currentCategory.day_can_borrow
          }
        }

        console.log(member);
  
        this.service.editWholeMember(this.currentMember._id, member).subscribe((res)=>{
          alert("UPDATE DATA");
          console.log(res);
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=> this.router.navigate(['/member']));
          });
  
      });
      
    } else {
      console.log(this.memberForm.value.category);
      this.categoryService.getCategoryById(this.memberForm.value.category).subscribe((res: any) => {
        this.currentCategory = res.data;

        // console.log(this.currentCategory);
        let member = {
          student_id: this.memberForm.value.student_id,
          password: this.memberForm.value.password,
          name: this.memberForm.value.name,
          tel: this.memberForm.value.tel,
          group_learning: this.memberForm.value.group_learning,
          address: this.memberForm.value.address,
          category: {
            category_id: this.currentCategory.category_id,
            name: this.currentCategory.name,
            day_can_borrow: this.currentCategory.day_can_borrow
          }
        }

        this.service.register(member).subscribe((res) => {
          alert("INSERT DATA");
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/member']));
        });
      });


    }
  }

  editMember(id: any) {
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getMemberById(id).subscribe((res) => {
      this.currentMember = res.data;
      this.categoryService.getCategoryByCategoryId(this.currentMember.category.category_id).subscribe((res: any) => {
        this.currentCategory = res.data;
        console.log(this.currentCategory);
        this.memberForm.controls['student_id'].setValue(this.currentMember.student_id);
        this.memberForm.controls['name'].setValue(this.currentMember.name);
        this.memberForm.controls['tel'].setValue(this.currentMember.tel);
        this.memberForm.controls['group_learning'].setValue(this.currentMember.group_learning);
        this.memberForm.controls['category'].setValue(this.currentCategory._id);
        this.memberForm.controls['address'].setValue(this.currentMember.address);
        this.memberForm.controls['password'].disable();
      });
    });
  }

}
