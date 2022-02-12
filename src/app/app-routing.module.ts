import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/pages/book/book.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { MainComponent } from './components/pages/main/main.component';
import { MemberComponent } from './components/pages/member/member.component';
import { StaffComponent } from './components/pages/staff/staff.component';
import { MenubarComponent } from './components/shared/menubar/menubar.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';

const routes: Routes = [
  {path: '',component: MainComponent},
  {path: 'category',component: CategoryComponent},
  {path: 'staff',component: StaffComponent},
  {path: 'book',component: BookComponent},
  {path: 'member',component: MemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
