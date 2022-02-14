import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { BookComponent } from './components/pages/book/book.component';
import { StaffComponent } from './components/pages/staff/staff.component';
import { MemberComponent } from './components/pages/member/member.component';
import { MenubarComponent } from './components/shared/menubar/menubar.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { MainComponent } from './components/pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BorrowComponent } from './components/pages/borrow/borrow.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthInterceptor } from './helper/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    BookComponent,
    StaffComponent,
    MemberComponent,
    MenubarComponent,
    NavigationComponent,
    MainComponent,
    BorrowComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
