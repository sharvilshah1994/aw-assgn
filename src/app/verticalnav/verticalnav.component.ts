import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-verticalnav',
  templateUrl: './verticalnav.component.html',
  styleUrls: ['./verticalnav.component.css']
})
export class VerticalnavComponent implements OnInit {
  Activeroute: any;


  constructor(private router: Router) {
    this.Activeroute = router.routerState.snapshot.url;
    console.log(this.Activeroute);
  }

  ngOnInit() {
  }

}
