import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { UnitsPage } from '../units/units';
import { CoursesPage } from '../courses/courses';
import { CurrentUserPage } from '../currentuser/currentuser';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = UnitsPage;
  tab3Root: any = CoursesPage;
  tab4Root: any = CurrentUserPage;

  constructor() {

  }
}
