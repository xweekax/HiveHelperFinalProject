import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.css']
})
export class CardLinkComponent implements OnInit {

  @Input() link: string;
  @Input() data: string | number;
  @Input() title: string;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}
