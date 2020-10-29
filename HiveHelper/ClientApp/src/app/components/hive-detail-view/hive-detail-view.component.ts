import { Component, OnInit } from '@angular/core';
import { HiveDataService } from '../../services/hive-data.service';
import { ActionDataService } from '../../services/action-data.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Hive } from '../../models/hive';
import { ActionDetail } from '../../models/action-detail';

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
  
  constructor(private hive_data: HiveDataService, private action_data:  ActionDataService, private route: ActivatedRoute) {
    this.details = [];
  }

  ngOnInit() {
    this.hive_id = +this.route.snapshot.paramMap.get("hive_id");
    this.refreshActionDetails();
  }

  refreshActionDetails() {
    this.action_data.getActionDetails(this.hive_id).subscribe(results => {
      while (this.details.length > 0) { this.details.pop(); }
      results.forEach((value) => this.details.push(value));
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
    this.action_data.updateActionDetail(action).subscribe(response => {
      if (!response.result) {
        action.completed = false;
        this.message = "Failed to complete action";
      }
    });
  }

  onAdd(action: ActionDetail) {
    this.action_data.addActionDetail(action).subscribe(response => {
      if (response.result) {
        this.refreshActionDetails();
      }
    })
  }

}
