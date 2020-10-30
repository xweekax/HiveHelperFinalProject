import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './components/login/login.component';
import { YardsViewComponent } from './components/yards-view/yards-view.component';
import { HivesViewComponent } from './components/hives-view/hives-view.component';
import { HiveDetailViewComponent } from './components/hive-detail-view/hive-detail-view.component';
import { CardLinkComponent } from './components/card-link/card-link.component';
import { AddActionDetailComponent } from './components/add-action-detail/add-action-detail.component';
import { ActionDetailItemComponent } from './components/action-detail-item/action-detail-item.component';
import { AddYardComponent } from './components/add-yard/add-yard.component';
import { AddHiveComponent } from './components/add-hive/add-hive.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    YardsViewComponent,
    HivesViewComponent,
    HiveDetailViewComponent,
    CardLinkComponent,
    AddActionDetailComponent,
    ActionDetailItemComponent,
    AddYardComponent,
    AddHiveComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'Overview' },
      { path: 'Login', pathMatch: 'full', component: LoginComponent },
      { path: 'Overview', pathMatch: 'full', component: YardsViewComponent },
      { path: 'Yard/:location_id', pathMatch: 'full', component: HivesViewComponent },
      { path: 'Hive/:hive_id', pathMatch: 'full', component: HiveDetailViewComponent },
      { path: 'LoginRequired', pathMatch: 'full', component: LoginComponent, data: {message: "You must login to use the site."} }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
