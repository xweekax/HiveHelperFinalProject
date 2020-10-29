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
  primary_action: PrimaryAction;
  primary_action_list: PrimaryAction[];
  secondary_action: SecondaryAction;
  secondary_action_list: SecondaryAction[];
  tertiary_action: TertiaryAction;
  tertiary_action_list: TertiaryAction[];
  comments: string;
  schedule_date: Date;
  submitted_date: Date;
  completed_date: Date;
  scheduled: boolean;
  message: string;

  constructor(private action_data: ActionDataService, private user_data: UserDataService) {

  }

  ngOnInit() {
    this.submitted_date = new Date();
    this.schedule_date = new Date();
    this.completed_date = new Date();
  }

  addAction() {
    if (this.scheduled && this.schedule_date < this.submitted_date) {
      this.message = "Incorrect Scheduled Date";
      return
    }

    let addObject: ActionDetail = {
      primary_action_id: this.primary_action.id,
      secondary_action_id: this.secondary_action.id,
      tertiary_action_id: this.tertiary_action.id,
      hive_id: this.hive_id,
      completed_by_id: this.user_data.loggedIn.user.id,
      entered_by_id: this.user_data.loggedIn.user.id,
      completed: !this.scheduled,
      entry_date: this.submitted_date,      
      completed_date: this.completed_date,
      scheduled_date: this.schedule_date,
      comments: this.comments
    }
    this.added.emit(addObject);
  }

}
