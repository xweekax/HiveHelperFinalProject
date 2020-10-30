import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '../../models/location';

@Component({
  selector: 'app-add-yard',
  templateUrl: './add-yard.component.html',
  styleUrls: ['./add-yard.component.css']
})
export class AddYardComponent implements OnInit {

  @Output() added: EventEmitter<Location> = new EventEmitter();

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
    this.added.emit(this.new_yard);
    this.setYard();
  }

}
