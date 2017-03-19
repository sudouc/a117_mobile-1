import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { UnitsPage } from '../pages/units/units';
import { CoursesPage } from '../pages/courses/courses';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import { CurrentUserPage } from '../pages/currentuser/currentuser';

@NgModule({
  declarations: [
    MyApp,
    UnitsPage,
    CoursesPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    CurrentUserPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UnitsPage,
    CoursesPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    CurrentUserPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
