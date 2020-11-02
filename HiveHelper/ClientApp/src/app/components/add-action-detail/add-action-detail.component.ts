import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionDataService } from '../../services/action-data.service';
import { PrimaryAction } from '../../models/primary-action';
import { SecondaryAction } from '../../models/secondary-action';
import { TertiaryAction } from '../../models/tertiary-action';
import { UserDataService } from '../../services/user-data.service';
import { ActionDetail } from '../../models/action-detail';

@Component({
  selector: 'app-add-action-detail',
  templateUrl: './add-action-detail.component.html',
  styleUrls: ['./add-action-detail.component.css']
})
export class AddActionDetailComponent implements OnInit {

  @Input() hive_id: number;
  @Output() added: EventEmitter<ActionDetail> = new EventEmitter();

  primary_action_list: PrimaryAction[];
  secondary_action_list: SecondaryAction[];
  tertiary_action_list: TertiaryAction[];

  new_action: ActionDetail;
  scheduled: boolean;
  message: string;

  constructor(private action_data: ActionDataService, private user_data: UserDataService) {
    this.primary_action_list = [];
    this.secondary_action_list = [];
    this.tertiary_action_list = [];
  }

  setAction() {
    this.new_action = {
      id: 0,
      primary_action_id: 0,
      secondary_action_id: 0,
      tertiary_action_id: 0,
      hive_id: this.hive_id,
      completed_by_id: this.user_data.loggedIn.user.id,
      entered_by_id: this.user_data.loggedIn.user.id,
      completed: true,
      entry_date: new Date(),
      completed_date: new Date(),
      scheduled_date: new Date(),
      comments: '',
      primary_action_name: '',
      secondary_action_name: '',
      tertiary_action_name: '',
      completed_by_first_name: '',
      completed_by_last_name: '',
      entered_by_first_name: '',
      entered_by_last_name: ''
    }
  }

  ngOnInit() {
    this.setAction();
    this.action_data.getPrimaryActions().subscribe(results => {
      results.forEach((value) => this.primary_action_list.push(value));
    });
  }

  getSecondaryActions() {
    this.action_data.getSecondaryActions(this.new_action.primary_action_id).subscribe(results => {
      while (this.secondary_action_list.length > 0) { this.secondary_action_list.pop(); }
      results.forEach((value) => this.secondary_action_list.push(value));
    });
  }

  getTertiaryActions() {
    this.action_data.getTertiaryActions(this.new_action.secondary_action_id).subscribe(results => {
      while (this.tertiary_action_list.length > 0) { this.tertiary_action_list.pop(); }
      results.forEach((value) => this.tertiary_action_list.push(value));
    });
  }

  addAction() {
    if (this.scheduled && this.new_action.scheduled_date < this.new_action.entry_date) {
      this.message = "Incorrect Scheduled Date";
      return
    }
    else if (this.scheduled) {
      this.new_action.completed = false;
      this.new_action.completed_date = this.new_action.scheduled_date;
      //this.new_action.completed_date = null;
    }
    this.added.emit(this.new_action);
    this.setAction();
  }

}
