import { Component, OnInit } from '@angular/core';
import { HiveDataService } from '../../services/hive-data.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hive } from '../../models/hive';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-hives-view',
  templateUrl: './hives-view.component.html',
  styleUrls: ['./hives-view.component.css']
})

export class HivesViewComponent implements OnInit {
  hives: Hive[];
  yellow_hives: Hive[];
  red_hives: Hive[];
  green_hives: Hive[];
  search: string;
  displayGreen: boolean;
  displayBlue: boolean;
  displayRed: boolean;
  displayYellow: boolean;

  location_id: number;
  constructor(private data: HiveDataService, private user_data: UserDataService, private route: ActivatedRoute, private router: Router) {
    this.hives = [];
    this.yellow_hives = [];
    this.red_hives = [];
    this.green_hives = [];
  }

  ngOnInit() {
    if (!this.user_data.loggedIn.result) {
      this.router.navigate(['LoginRequired']);
    }
    this.location_id = +this.route.snapshot.paramMap.get("location_id");
    this.refreshHives();
  }

  onAdd(new_hive: Hive) {
    this.data.addHive(new_hive).subscribe(results => { this.refreshHives(); });
  }

  getColor(hive: Hive): string {

    if (this.red_hives.includes(hive)) {
      return 'rgba(255, 34, 27, 0.60)';
    }
    else if (this.green_hives.includes(hive)) {
      return 'rgba(86, 255, 27, 0.60)';
    }
    else if (this.yellow_hives.includes(hive)) {
      return 'rgba(248, 255, 27, 0.60)';
    }
    else {
      return 'rgba(51, 138, 255, 0.85)';
    }
  }

  filterHives(): Hive[] {

    let displayHives: Hive[] = [];
    if ((!this.displayGreen && !this.displayBlue && !this.displayRed && !this.displayYellow) || (this.displayGreen && this.displayBlue && this.displayRed && this.displayYellow)) {
      displayHives = this.hives;
    }
    else {
      this.hives.forEach((value) => {
        if (this.red_hives.includes(value) && this.displayRed) {
          displayHives.push(value)
        }
        if (this.green_hives.includes(value) && this.displayGreen) {
          displayHives.push(value)
        }
        if ((!this.red_hives.includes(value) && !this.green_hives.includes(value) && !this.yellow_hives.includes(value)) && this.displayBlue) {
          displayHives.push(value)
        }
        if (this.yellow_hives.includes(value) && !this.red_hives.includes(value) && this.displayYellow) {
          displayHives.push(value)
        }
      });
    }

    if (!displayHives) {
      return [];
    }
    else if (!this.search) {
      return displayHives;
    }
    else {
      return displayHives.filter(x => x.name.includes(this.search));
    }
  }

  refreshHives() {
    this.data.getHives(this.location_id).subscribe(results => {
      //clear out all hives lists to get new values.
      while (this.hives.length > 0) { this.hives.pop(); }
      while (this.green_hives.length > 0) { this.green_hives.pop(); }
      while (this.yellow_hives.length > 0) { this.yellow_hives.pop(); }
      while (this.red_hives.length > 0) { this.red_hives.pop(); }
      //for each results add it to the hives.
      results.forEach((value) => {
        this.hives.push(value)

        //check if it is green
        this.data.getCheckedTodayHives(this.location_id).subscribe(results => {
          results.forEach((h) => {
            if (h.id == value.id) {
              this.green_hives.push(value);
            }
          });
        });

        //check if it is yellow
        this.data.getOverdueHives(this.location_id).subscribe(results => {
          results.forEach((h) => {
            if (h.id == value.id) {
              this.yellow_hives.push(value);
            }
          });
        });

        //check if it is red
        this.data.getUrgentHives(this.location_id).subscribe(results => {
          results.forEach((h) => {
            if (h.id == value.id) {
              this.red_hives.push(value);
            }
          });
        });


      });
    });
  }
}
