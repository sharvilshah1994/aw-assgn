import {Component, OnInit, ViewChild} from '@angular/core';
import {BackendService} from "../backend.service";
import {Globals} from "../globals";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.css']
})
export class VizComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Count';
  showYAxisLabel = true;
  horizontal_flag = false;
  vertical_flag = false;
  yAxisLabel = 'Events';
  xLabel = 'Date';
  yLabel = 'Count';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  view: any[] = [700, 400];

  data = [];
  heading: any = 'Event Counter - All time';

  constructor(private backend: BackendService, private global: Globals, private route: Router) {
    if(global.loginStatus) {
      this.loadData();
    }
  }

  ngOnInit() {

  }

  triggerGraphChange() {
    const val = this.loginForm.value;
    if (val.radiogroup == 2) {
      this.data = [];
      this.horizontal_flag = false;
      this.loadDateWiseData();
      this.heading = 'Event counter - Date wise';
    } else {
      this.vertical_flag = false;
      this.data = [];
      this.heading = 'Event Counter - All time';
      this.horizontal_flag = false;
      this.loadData();
    }
  }

  loadDateWiseData() {
    this.backend.getUserLogs().subscribe(
      (dat:any) => {
        let ans = [];
        for (let i of dat) {
          let f_flag = false;
          let obj = {'name': '', 'series': []};
          let date = new Date(parseInt(i.timestamp));
          let day = date.getDate();
          let month = date.getMonth();
          let year = date.getFullYear();
          obj['name'] = month + '/' + day + '/' + year;
          for (let k of ans) {
            if(k.name === month + '/' + day + '/' + year) {
              f_flag = true;
            }
          }
          if (!f_flag) {
            ans.push(obj);
          }
        }
        for (let j of ans) {
          let series = [];
          for (let i of dat) {
            let check_flag = false;
            let obj = {'name': '', 'value': 0};
            let date = new Date(parseInt(i.timestamp));
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let date_format = month + '/' + day + '/' + year;
            if (date_format === j.name) {
              for (let k of series) {
                if (k.name === i.event_type) {
                  check_flag = true;
                  k['value'] += 1
                }
              }
              if (!check_flag) {
                obj['name'] = i.event_type;
                obj['value'] = 1;
                series.push(obj);
              }
            }
          }
          j.series = series;
        }
        console.log(ans);
        this.data = ans;
        this.vertical_flag = true;
    });
  }

  loadData() {
    this.backend.getUserLogs().subscribe(
      (dat: any) => {
        let obj = {};
        for (let i of dat) {
          if (i.event_type in obj) {
            obj[i.event_type] += 1;
          } else {
            obj[i.event_type] = 0;
          }
        }
        for (let j in obj) {
          let obj_ins = {};
          obj_ins['name'] = j;
          obj_ins['value'] = obj[j];
          this.data.push(obj_ins);
        }
        this.horizontal_flag = true;
      }
    );
  }


  onSelect(event) {
    console.log(event);
  }



}
