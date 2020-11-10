import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.scss']
})
export class GridSystemComponent implements OnInit {
  @Input() dataSrc: any[];
  constructor() { }

  ngOnInit() {
  }

}
