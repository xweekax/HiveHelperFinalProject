import { Component, OnInit } from '@angular/core';
import { PrimaryAction } from '../../models/primary-action';
import { SecondaryAction } from '../../models/secondary-action';
import { TertiaryAction } from '../../models/tertiary-action';
import { ActionDataService } from '../../services/action-data.service';
import { ActionDetail } from '../../models/action-detail';

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.css']
})
export class AddOptionsComponent implements OnInit {

  primary_action_list: PrimaryAction[];
  secondary_action_list: SecondaryAction[];
  tertiary_action_list: TertiaryAction[];

  new_primary: PrimaryAction;
  new_secondary: SecondaryAction;
  new_tertiary: TertiaryAction;

  constructor(private action_data: ActionDataService) { }

  ngOnInit() {
    this.setPrimary();
    this.setSecondary(0);
    this.setTertiary(0);
    this.getPrimaryActions();
  }

  setPrimary() {
    this.new_primary = {
      id: 0,
      name: '',
      active: true
    }
  }

  setSecondary(id: number) {
    this.new_secondary = {
      id: 0,
      name: '',
      active: true,
      primary_action_id: id
    }
  }

  setTertiary(id: number) {
    this.new_tertiary = {
      id: 0,
      name: '',
      active: true,
      secondary_action_id: id
    }
  }

  addPrimary(name: string) {
    this.new_primary.name = name;
    this.action_data.addPrimaryAction(this.new_primary).subscribe(response => {
      if (response.result) {
        this.getPrimaryActions();
      }
    });
  }

  addSecondary(name: string) {
    this.new_secondary.name = name;
    this.action_data.addSecondaryAction(this.new_secondary).subscribe(response => {
      if (response.result) {
        this.getSecondaryActions(this.new_secondary.primary_action_id);
        this.setSecondary(this.new_secondary.primary_action_id);
      }
    });
  }

  addTertiary(name: string) {
    this.new_tertiary.name = name;
    this.action_data.addTertiaryAction(this.new_tertiary).subscribe(response => {
      if (response.result) {
        this.getTertiaryActions(this.new_tertiary.secondary_action_id);
        this.setTertiary(this.new_tertiary.secondary_action_id);
      }
    });
  }

  getPrimaryActions() {
    this.setSecondary(0);
    this.setTertiary(0);
    this.primary_action_list = [];
    this.secondary_action_list = [];
    this.tertiary_action_list = [];
    this.action_data.getPrimaryActions().subscribe(results => {
      results.forEach((value) => this.primary_action_list.push(value));
    });
  }

  getSecondaryActions(selected_id: number) {
    this.setSecondary(0);
    this.setTertiary(0);
    this.new_secondary.primary_action_id = +selected_id;
    this.tertiary_action_list = [];
    this.action_data.getSecondaryActions(selected_id).subscribe(results => {
      while (this.secondary_action_list.length > 0) { this.secondary_action_list.pop(); }
      results.forEach((value) => this.secondary_action_list.push(value));
    });
  }

  getTertiaryActions(selected_id: number) {
    this.setTertiary(0);
    this.new_tertiary.secondary_action_id = +selected_id;
    this.action_data.getTertiaryActions(selected_id).subscribe(results => {
      while (this.tertiary_action_list.length > 0) { this.tertiary_action_list.pop(); }
      results.forEach((value) => this.tertiary_action_list.push(value));
    });
  }

}
