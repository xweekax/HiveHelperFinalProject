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
  yards: Location[];
  constructor(private data: HiveDataService, private user_data: UserDataService, private router: Router) {
    this.yards = [];
  }

  ngOnInit() {
    if (!this.user_data.loggedIn.result) {
      this.router.navigate(['LoginRequired']);
    }
    this.refreshYards();
  }

  refreshYards() {
    this.data.getYards().subscribe(results => {
      while (this.yards.length > 0) { this.yards.pop(); }
      results.forEach((value) => this.yards.push(value));
    });
  }

}
