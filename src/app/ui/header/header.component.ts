import { Component, OnInit} from '@angular/core';
import {TimeService} from '../../services/time.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(public timeService: TimeService) { }

  ngOnInit() {
  }

}
