import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../backend.service";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  multi: any[];

  view: any[] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Event types';
  showYAxisLabel = true;
  yAxisLabel = 'Users';
  treeMap: boolean = false;
  single: any[];
  heading = 'Heat Map: Social Network Visualization';

  colorScheme = {
    domain: ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000']
  };
  graph_flag = false;

  constructor(private backend: BackendService) {
    this.loadHeatMap();
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

  triggerGraphChange() {
    if (!this.treeMap) {
      this.graph_flag = false;
      this.heading = 'Tree Map: Social Network Visualization';
      this.backend.getAllLogs().subscribe(
        (dat: any) => {
          let ans = [];
          for (let data of dat) {
            let check_flag = false;
            let username = data.username;
            let target = data.target;
            let obj = {};
            if (target != null) {
              for (let row of ans) {
                if (username === row.name && target.indexOf('vote') != -1) {
                  check_flag = true;
                  row.value += 1;
                }
              }
              if (!check_flag && target.indexOf('vote') != -1) {
                obj['name'] = username;
                obj['value'] = 1;
                ans.push(obj);
              }
            }
          }
          this.single = ans;
          this.treeMap = true;
        }
      )
    }
    else {
      this.treeMap = false;
      this.heading = 'Heat Map';
      this.loadHeatMap();
    }
  }

  loadHeatMap() {
    this.backend.getAllLogs().subscribe(
      (dat: any) => {
        let ans = [];
        for (let data of dat) {
          let check_flag = false;
          let obj = {};
          let username = data.username;
          let eventType = data.event_type;
          for (let rows of ans) {
            let obj1 = {};
            if (rows.name === eventType) {
              check_flag = true;
              let flag = false;
              for (let s of rows.series) {
                if (s.name === username) {
                  flag = true;
                  s.value += 1;
                }
              }
              if (!flag) {
                obj1['name'] = username;
                obj1['value'] = 1;
                rows.series.push(obj1);
              }
            }
          }
          if (!check_flag) {
            if (eventType.indexOf('scroll') === -1) {
              obj['name'] = eventType;
              obj['series'] = [];
              ans.push(obj);
            }
          }
        }
        console.log(ans);
        this.multi = ans;
        this.graph_flag = true;
      }
    );
  }
}
