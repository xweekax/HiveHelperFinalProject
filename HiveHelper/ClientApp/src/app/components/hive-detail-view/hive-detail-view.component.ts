import { Component, OnInit } from '@angular/core';
import { HiveDataService } from '../../services/hive-data.service';
import { ActionDataService } from '../../services/action-data.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Hive } from '../../models/hive';
import { ActionDetail } from '../../models/action-detail';
import { UserDataService } from '../../services/user-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hive-detail-view',
  templateUrl: './hive-detail-view.component.html',
  styleUrls: ['./hive-detail-view.component.css']
})

export class HiveDetailViewComponent implements OnInit {
  hive: Hive;
  hive_id: number;
  details: ActionDetail[];
  message: string;
  
  constructor(private hive_data: HiveDataService, private action_data:  ActionDataService, private route: ActivatedRoute, private user_data: UserDataService, private router: Router, private _location: Location) {
    this.details = [];
  }

  ngOnInit() {
    if (!this.user_data.loggedIn.result) {
      this.router.navigate(['LoginRequired']);
    }
    this.hive_id = +this.route.snapshot.paramMap.get("hive_id");
    this.hive_data.getHive(this.hive_id).subscribe(result => { this.hive = result });
    this.refreshActionDetails();
  }

  goBack() {
    this._location.back();
  }

  refreshActionDetails() {
    this.action_data.getActionDetails(this.hive_id).subscribe(results => {
      while (this.details.length > 0) { this.details.pop(); }
      results.forEach((value) => this.details.unshift(value));
    });
  }

  completedActions() {
    return this.details.filter(x => x.completed);
  }

  incompleteActions() {
    return this.details.filter(x => !x.completed);
  }

  completeTask(action: ActionDetail) {
    action.completed = true;
    action.completed_by_id = this.user_data.loggedIn.user.id;
    action.completed_by_first_name = this.user_data.loggedIn.user.first_name;
    action.completed_by_last_name = this.user_data.loggedIn.user.last_name;
    action.completed_date = new Date();
    this.action_data.updateActionDetail(action).subscribe(response => {
      if (!response.result) {
        action.completed = false;
        this.message = "Failed to complete action";
      }
      else {
        this.refreshActionDetails();
      }
    });
  }

  onAdd(action: ActionDetail) {
    this.action_data.addActionDetail(action).subscribe(response => {
      if (response.result) {
        this.refreshActionDetails();
      }
    });
  }

  delete() {
    this.hive_data.deleteHive(this.hive_id).subscribe(response => {
      if (response.result) {
        this.goBack();
      }
    });
  }

}
