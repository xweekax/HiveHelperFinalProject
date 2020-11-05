import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '../../models/location';

@Component({
  selector: 'app-add-yard',
  templateUrl: './add-yard.component.html',
  styleUrls: ['./add-yard.component.css']
})
export class AddYardComponent implements OnInit {

  @Output() added: EventEmitter<Location> = new EventEmitter();

  nameError: boolean;
  addressError: boolean;

  new_yard: Location;

  constructor() { }

  setYard() {
    this.new_yard = {
      id: 0,
      name: "",
      address: ""
    }
  }

  ngOnInit() {
    this.setYard();
  }

  addYard() {
    let checkedYard = true;

    if (this.new_yard.name == "") {
      this.nameError = true;
      checkedYard = false;
    }
    else {
      this.nameError = false;
    }

    if (this.new_yard.address == "") {
      this.addressError = true;
      checkedYard = false;
    }
    else {
      this.addressError = false;
    }

    if (checkedYard) {
      this.added.emit(this.new_yard);
      this.setYard();
    }    
  }
}
