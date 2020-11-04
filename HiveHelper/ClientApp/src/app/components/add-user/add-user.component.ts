import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserDataService } from '../../services/user-data.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() added: EventEmitter<User> = new EventEmitter();

  new_user: User;
  first_name_error: boolean;
  last_name_error: boolean;
  access_level_error: boolean;
  username_error: boolean;


  constructor(private user_data: UserDataService) { }

  setUser() {
    this.new_user = {
      id: 0,
      first_name: '',
      last_name: '',
      access_level: 0,
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.setUser();
  }

  addUser() {
    
    let checkedUser = true;

    if (this.new_user.first_name == '') {
      checkedUser = false;
      this.first_name_error = true;
    }
    else {
      this.first_name_error = false; 
    }
    if (this.new_user.last_name == '') {
      checkedUser = false;
      this.last_name_error = true;
    }
    else {
      this.last_name_error = false;
    }
    if (this.new_user.access_level == 0) {
      checkedUser = false;
      this.access_level_error = true;
    }
    else {
      this.access_level_error = false;
    }


    if (this.new_user.username == '') {
      checkedUser = false;
      this.username_error = true;
    }
    else {
      
      this.user_data.isUsernameAvailable(this.new_user.username).subscribe(response => {        
        if (response.result && checkedUser) {
          this.added.emit(this.new_user);
          this.setUser();
        }
        else if (response.result) {
          this.username_error = false;
        }
        else {
          this.username_error = true;
        }
      });      
    }

   
    
  }

}
