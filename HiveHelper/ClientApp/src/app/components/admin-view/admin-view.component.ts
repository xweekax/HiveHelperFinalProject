import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private user_data: UserDataService, private router: Router) { }

  onAdd(user: User) {
    this.user_data.addUser(user).subscribe() ;
  }

  ngOnInit() {

    if (!this.user_data.loggedIn.result) {
      this.router.navigate(['LoginRequired']);
    }
    else if (!this.user_data.loggedIn.permissions.includes('admin')) {
      this.router.navigate(['Overview']);
    }

  }

}
