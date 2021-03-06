import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { ApiResult } from '../../models/api-result';
import { Router, ActivatedRoute } from '@angular/router';

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
  enterPassword: string;
  displayError: boolean;
  criteriaError: boolean;
  usernameError: boolean;
  matchError: boolean;
  redirectMessage: string;
  imgPath1 = '../../../assets/bee1.png';
  imgPath2 = '../../../assets/bee2.png';

  constructor(private user: UserDataService, private router: Router, private route: ActivatedRoute) {
    //used for initial login
    this.username = '';
    this.password = '';

    //used to update password for new users
    this.enterPassword = '';
    this.confirmPassword = '';

    //controls whether to display a login error, or if a new user needs to enter a password
    this.passwordRequired = false;
    this.displayError = false;
  }

  //no initialization logic needed yet.
  ngOnInit() {
    if (this.route.snapshot.data.message) {
      this.redirectMessage = this.route.snapshot.data.message;
    }
  }

  //call user service to login, store the returned result in the service, and process it here.
  attemptLogin() {
    if (this.username) {
      this.user.login(this.username, this.password).subscribe(results => {
        this.user.loggedIn = results;
        this.loginResult(results);
      });
    }
    else {
      this.usernameError = true;
      this.displayError = true;
    }
    
  }

  //switch to require password for new users, pass successes to the rest of the app, show errors for failed login.
  loginResult(response: ApiResult) {
    if (response.result && response.status == 'new') {
      //prompt for password
      this.passwordRequired = true;
    }
    else if (response.result) {
      //take to main page
      this.router.navigate(['Overview']);
    }
    else {
      //login failed
      this.displayError = true;
    }
  }

  //send the updated password to the database.
  //must be 8 characters to 16, have 1 upper case, 1 lower case, and 1 number
  updatePassword() {
    //check password requirements   
    if (this.enterPassword == this.confirmPassword && this.enterPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/)) {
      this.user.updatePassword('', this.enterPassword).subscribe(result => {
        this.user.loggedIn.user.password = ''; //reset the password to nothing, not stored here.
        this.router.navigate(['Overview']);
      });
    }
    else if (!this.enterPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/)) {
      this.criteriaError = true;
    }
    else {
      this.matchError = true;
      this.criteriaError = false;
    }
  }
}
