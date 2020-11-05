import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Hive } from '../../models/hive';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.css']
})
export class AddHiveComponent implements OnInit {

  @Input() location_id: number;
  @Output() added: EventEmitter<Hive> = new EventEmitter();

  nameError: boolean;
  intervalError: boolean;

  new_hive: Hive;

  constructor() { }

  setHive() {
    this.new_hive = {
      id: 0,
      name: "",
      inspection_interval: null,
      location_id: this.location_id
    };
  }

  ngOnInit() {
    this.setHive();
  }

  addHive() {
    let checkedHive = true;

    if (this.new_hive.name == "") {
      this.nameError = true;
      checkedHive = false;
    }
    else {
      this.nameError = false;
    }

    if (this.new_hive.inspection_interval == null || this.new_hive.inspection_interval <= 0) {
      this.intervalError = true;
      checkedHive = false;
    }
    else {
      this.intervalError = false;
    }

    if (checkedHive) {
      this.added.emit(this.new_hive);
      this.setHive();
    }    
  }

}
