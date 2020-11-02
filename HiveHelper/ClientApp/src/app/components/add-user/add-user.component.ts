import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() added: EventEmitter<User> = new EventEmitter();

  new_user: User;
  constructor() { }

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
    this.added.emit(this.new_user);
    this.setUser();
  }

}
