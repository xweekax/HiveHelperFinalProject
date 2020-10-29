import { Component, OnInit } from '@angular/core';
import { HiveDataService } from '../../services/hive-data.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Hive } from '../../models/hive';

@Component({
  selector: 'app-hives-view',
  templateUrl: './hives-view.component.html',
  styleUrls: ['./hives-view.component.css']
})
export class HivesViewComponent implements OnInit {
  hives: Hive[];
  location_id: number;
  constructor(private data: HiveDataService, private route: ActivatedRoute) {
    this.hives = [];
  }

  ngOnInit() {
    this.location_id = +this.route.snapshot.paramMap.get("location_id");
    this.refreshHives();
  }

  refreshHives() {
    this.data.getHives(this.location_id).subscribe(results => {
      while (this.hives.length > 0) { this.hives.pop(); }
      results.forEach((value) => this.hives.push(value));
    });
  }

}
