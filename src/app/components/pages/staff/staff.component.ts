import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffServiceService } from 'src/app/service/staff-service.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffForm!: FormGroup;

  allStaff:any;
  currentStaff: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล";

  constructor(private service: StaffServiceService, private router: Router) { }

  ngOnInit(): void {
    this.statusBtnupdate = false;
    
    this.service.getStaff().subscribe((res: any)=>{
      this.allStaff = res.data;
    });

    this.staffForm = new FormGroup({
      staff_id: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      tel: new FormControl(),
      address: new FormControl(),
    })
  }

  btnEvent(){
    if(this.statusBtnupdate){
      let staff = {
        staff_id: this.staffForm.value.staff_id,
        name: this.staffForm.value.name,
        tel: this.staffForm.value.tel,
        address: this.staffForm.value.address
      }
  
      this.service.updateStaff(staff, this.currentStaff._id).subscribe((res)=>{
        alert("UPDATE DATA");
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/staff']));
        });

    }else{
      let staff = {
        staff_id: this.staffForm.value.staff_id,
        password: this.staffForm.value.password,
        name: this.staffForm.value.name,
        tel: this.staffForm.value.tel,
        address: this.staffForm.value.address
      }
  
      this.service.register(staff).subscribe((res)=>{
        alert("INSERT DATA");
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/staff']));
      });
    }
  }

  editStaff(id: any){
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getStaffById(id).subscribe((res)=>{
     this.currentStaff = res.data;
     console.log(this.currentStaff._id);
     this.staffForm.controls['staff_id'].setValue(this.currentStaff.staff_id);
     this.staffForm.controls['name'].setValue(this.currentStaff.name);
     this.staffForm.controls['tel'].setValue(this.currentStaff.tel);
     this.staffForm.controls['password'].disable();
    //  this.memberForm.controls['category'].setValue(this.currentMember.category.category_name);
     this.staffForm.controls['address'].setValue(this.currentStaff.address);
    }); 
  }

}
