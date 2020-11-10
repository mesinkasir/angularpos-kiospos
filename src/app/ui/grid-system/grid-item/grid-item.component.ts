import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {
  @Input() dataSrc: any;
  constructor() { }

  ngOnInit() {
  }

}
