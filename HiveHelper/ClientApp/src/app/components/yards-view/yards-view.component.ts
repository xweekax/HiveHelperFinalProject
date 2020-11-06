import { Component, OnInit } from '@angular/core';
import { HiveDataService } from '../../services/hive-data.service';
import { Location } from '../../models/location';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yards-view',
  templateUrl: './yards-view.component.html',
  styleUrls: ['./yards-view.component.css']
})

export class YardsViewComponent implements OnInit {
  greenYards: Location[];
  yellowYards: Location[];
  redYards: Location[];
  allYards: Location[];
  search: string;
  imgPath1 = '../../../assets/bee1.png';
  imgPath2 = '../../../assets/bee2.png';

  displayGreen: boolean;
  displayBlue: boolean;
  displayRed: boolean;
  displayYellow: boolean;

  constructor(private data: HiveDataService, private user_data: UserDataService, private router: Router) {
    this.allYards = [];
    this.greenYards = [];
    this.yellowYards = [];
    this.redYards = [];
  }

  ngOnInit() {
    if (!this.user_data.loggedIn.result) {
      this.router.navigate(['LoginRequired']);
    }
    this.refreshYards();
  }

  onAdd(new_yard: Location) {
    this.data.addYard(new_yard).subscribe(results => { this.refreshYards(); });
  }

  getColor(yard: Location): string {
    if (this.redYards.includes(yard)) {
      return 'redCard';
    }
    else if (this.greenYards.includes(yard)) {
      return 'greenCard';
    }
    else if (this.yellowYards.includes(yard)) {
      return 'yellowCard';
    }
    else {
      return 'blueCard';
    }
  }

  filterYards(): Location[] {

    let displayYards: Location[] = [];
    if ((!this.displayGreen && !this.displayBlue && !this.displayRed && !this.displayYellow) || (this.displayGreen && this.displayBlue && this.displayRed && this.displayYellow)) {
      displayYards = this.allYards;
    }
    else {
      this.allYards.forEach((value) => {
        if (this.redYards.includes(value) && this.displayRed) {
          displayYards.push(value)
        }
        if (this.greenYards.includes(value) && this.displayGreen) {
          displayYards.push(value)
        }
        if ((!this.redYards.includes(value) && !this.greenYards.includes(value) && !this.yellowYards.includes(value)) && this.displayBlue) {
          displayYards.push(value)
        }
        if (this.yellowYards.includes(value) && !this.redYards.includes(value) && this.displayYellow) {
          displayYards.push(value)
        }
      });
    }

    if (!displayYards) {
      return [];
    }
    else if (!this.search) {
      return displayYards;
    }
    else {
      return displayYards.filter(x => x.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  }

  refreshYards() {
    this.data.getYards().subscribe(results => {
      while (this.allYards.length > 0) { this.allYards.pop(); }
      while (this.yellowYards.length > 0) { this.yellowYards.pop(); }
      while (this.greenYards.length > 0) { this.greenYards.pop(); }
      while (this.redYards.length > 0) { this.redYards.pop(); }
      results.forEach((value) => {
        //add to all yards
        this.allYards.push(value);

        //get all hives, to check status'
        this.data.getHives(value.id).subscribe(allHives => {
          value.hive_count = allHives.length;
          //check if all hives are green, add to green yards
          this.data.getCheckedTodayHives(value.id).subscribe(greenHives => {
            if (greenHives.length == allHives.length) {
              this.greenYards.push(value);
            }
          });

          //check if more than 25% are yellow, add to yellow yards
          this.data.getOverdueHives(value.id).subscribe(yellowHives => {
            if (yellowHives.length > allHives.length/4) {
              this.yellowYards.push(value);
            }
          });

          //check if any are red, add to red yards
          this.data.getUrgentHives(value.id).subscribe(redHives => {
            if (redHives.length > 0) {
              this.redYards.push(value);
            }
          });
        });
      });
    });
  }

}
