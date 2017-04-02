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

import { UnitDetailsPage } from '../pages/unit-details/unit-details';
import { UnitsProvider } from '../providers/units-provider';

import { CourseDetailsPage } from '../pages/course-details/course-details';
import { CoursesProvider } from '../providers/courses-provider';

import { HomePage } from '../pages/home/home';
import { SearchProvider } from '../providers/search-provider';

import { CommentsComponent } from '../components/comments/comments';

@NgModule({
    declarations: [
        MyApp,
        UnitsPage,
        CoursesPage,
        TabsPage,
        LoginPage,
        RegisterPage,
        CurrentUserPage,
        UnitDetailsPage,
        CourseDetailsPage,
        HomePage,
        CommentsComponent
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
        CurrentUserPage,
        UnitDetailsPage,
        CourseDetailsPage,
        HomePage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthService,
        UnitsProvider,
        CoursesProvider,
        SearchProvider
    ]
})
export class AppModule { }
