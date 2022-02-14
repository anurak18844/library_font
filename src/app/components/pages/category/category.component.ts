import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  categories: any;
  currentCategry: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล";

  constructor(private service: CategoryServiceService, private router: Router) { }

  ngOnInit(): void {
    this.statusBtnupdate = false;
    this.service.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });

    this.categoryForm = new FormGroup({
      category_id: new FormControl(),
      name: new FormControl(),
      day_can_borrow: new FormControl()
    })
  }

  deleteCategory(id:any){
    if(confirm("Confirm Delete??")){
      this.service.deleteCategory(id).subscribe((res)=>{
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/category']));
      });
    }
  }

  btnEvent(){
    if(this.statusBtnupdate){
      let category = {
        category_id: this.categoryForm.value.category_id,
        name: this.categoryForm.value.name,
        day_can_borrow: this.categoryForm.value.day_can_borrow
      }
      this.service.updateCategory(category,this.currentCategry._id).subscribe((res)=>{
        alert("UPDATE DATA");
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/category']));
        });

    }else{
      let category = {
        category_id: this.categoryForm.value.category_id,
        name: this.categoryForm.value.name,
        day_can_borrow: this.categoryForm.value.day_can_borrow
      }
  
      this.service.addCategory(category).subscribe((res)=>{
        alert("INSERT DATA");
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/category']));
      });
    }
  }

  editMember(id: any){
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getCategoryById(id).subscribe((res)=>{
     this.currentCategry = res.data;
     this.categoryForm.controls['category_id'].setValue(this.currentCategry.category_id);
     this.categoryForm.controls['name'].setValue(this.currentCategry.name);
     this.categoryForm.controls['day_can_borrow'].setValue(this.currentCategry.day_can_borrow);
    }); 
  }
}

