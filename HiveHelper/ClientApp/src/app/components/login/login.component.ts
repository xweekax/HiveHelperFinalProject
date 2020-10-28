import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { ApiResult } from '../../models/api-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  passwordRequired: boolean;
  displayError: boolean;

  constructor(private user: UserDataService, private route: Router) {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.passwordRequired = false;
    this.displayError = false;
  }

  ngOnInit() {
  }

  attemptLogin() {
    this.user.login(this.username, this.password).subscribe(results => {
      this.user.loggedIn = results;

      console.log(results);

      this.loginResult(results);
    });
  }

  loginResult(response: ApiResult) {
    if (response.result && response.status == 'new') {
      //prompt for password
      this.password = '';
      this.passwordRequired = true;
    }
    else if (response.result) {
      //take to main page
      this.route.navigate(['Overview']);
    }
    else {
      //login failed
      this.displayError = true;
    }
  }

  updatePassword() {
    //check password requirements
    if (this.password == this.confirmPassword && this.password.match(/(.*?=[A-Z])(.*?=[a-z])(.*?=[0-9]).{8,16}/)) {
      this.user.updatePassword('', this.password).subscribe(result => {
        this.user.loggedIn.user.password = '';
        this.route.navigate(['Overview']);
      });
    }
  }
}
