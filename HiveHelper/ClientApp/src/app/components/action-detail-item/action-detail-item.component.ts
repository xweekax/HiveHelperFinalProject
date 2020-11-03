import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionDetail } from '../../models/action-detail';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-action-detail-item',
  templateUrl: './action-detail-item.component.html',
  styleUrls: ['./action-detail-item.component.css']
})
export class ActionDetailItemComponent implements OnInit {
  @Input() action: ActionDetail;
  @Output() completed: EventEmitter<ActionDetail> = new EventEmitter();
  imgPath = '../../../assets/honeycomb1.jpg';
  constructor(private user_data: UserDataService) { }

  ngOnInit() {
  }

  complete() {
    this.completed.emit(this.action);
  }

}
