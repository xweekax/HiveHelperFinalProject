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

  new_hive: Hive;

  constructor() { }

  setHive() {
    this.new_hive = {
      id: 0,
      name: "",
      inspection_interval: 0,
      location_id: this.location_id
    };
  }

  ngOnInit() {
    this.setHive();
  }

  addHive() {
    this.added.emit(this.new_hive);
    this.setHive();
  }

}
