import { Component } from '@angular/core';

import { UnitsPage } from '../units/units';
import { CoursesPage } from '../courses/courses';
import { CurrentUserPage } from '../currentuser/currentuser';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = UnitsPage;
  tab2Root: any = CoursesPage;
  tab3Root: any = CurrentUserPage;

  constructor() {

  }
}
