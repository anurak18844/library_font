import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/pages/book/book.component';
import { BorrowComponent } from './components/pages/borrow/borrow.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainComponent } from './components/pages/main/main.component';
import { MemberComponent } from './components/pages/member/member.component';
import { StaffComponent } from './components/pages/staff/staff.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '',component: MainComponent},
  {path: 'category',component: CategoryComponent, canActivate: [ AuthGuard ]},
  {path: 'staff',component: StaffComponent, canActivate: [ AuthGuard ]},
  {path: 'book',component: BookComponent, canActivate: [ AuthGuard ]},
  {path: 'member',component: MemberComponent, canActivate: [ AuthGuard ]},
  {path: 'borrow',component: BorrowComponent, canActivate: [ AuthGuard ]},
  {path : "login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
