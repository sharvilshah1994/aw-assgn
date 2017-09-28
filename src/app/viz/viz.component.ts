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
    domain: ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000']
  };

  colorScheme_pie = {
    domain: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628']
  };
  view: any[] = [700, 400];

  data = [];
  heading: any = 'Event Counter - All time';
  content1 = "The above graph is the piechart which depicts all the user's events. From this, we can" +
    "know what event has user used the most. This logs mouse activities and key activities.";

  //Spider Graph Vars
  spider_flag = false;
  public radarChartLabels: string[] = ['mousedown', 'focusin', 'mouseup', 'click', 'mouseleave', 'mouseenter', 'keydown', 'change', 'focusout'];
  public radarChartData: any = [];
  public radarChartType: string = 'radar';


  constructor(private backend: BackendService, private global: Globals, private route: Router) {
    if (global.loginStatus) {
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
      (dat: any) => {
        let ans = [];
        let count = 0;
        for (let i of dat) {
          let f_flag = false;
          let obj = {'name': '', 'series': []};
          let date = new Date(parseInt(i.timestamp));
          let day = date.getDate();
          let month = date.getMonth()+1;
          let year = date.getFullYear();
          obj['name'] = month + '/' + day + '/' + year;
          for (let k of ans) {
            if (k.name === month + '/' + day + '/' + year) {
              f_flag = true;
            }
          }
          if (!f_flag && count < 4) {
            ans.push(obj);
            count += 1;
          }
        }
        for (let j of ans) {
          let series = [];
          for (let i of dat) {
            let check_flag = false;
            let obj = {'name': '', 'value': 0};
            let date = new Date(parseInt(i.timestamp));
            let day = date.getDate();
            let month = date.getMonth()+1;
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
                if (i.event_type.indexOf('scroll') === -1) {
                  obj['name'] = i.event_type;
                  obj['value'] = 1;
                  series.push(obj);
                }
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
          if (j.indexOf('scroll') === -1) {
            obj_ins['name'] = j;
            obj_ins['value'] = obj[j];
            this.data.push(obj_ins);
          }
        }
        this.horizontal_flag = true;
      }
    );
  }


  onSelect(event) {
    if (this.horizontal_flag) {
      this.data = [];
      this.horizontal_flag = false;
      this.spider_flag = false;
      this.loadDateWiseData();
      this.heading = 'Event counter - Date wise';
    } else {
      this.vertical_flag = false;
      this.spider_flag = false;
      this.data = [];
      this.heading = 'Event Counter - All time';
      this.horizontal_flag = false;
      this.loadData();
    }
  }

  triggerSpider() {
    if (!this.spider_flag) {
      this.vertical_flag = false;
      this.horizontal_flag = false;
      this.backend.getAllLogs().subscribe(
        (dat: any) => {
          let ans = [];
          for (let data of dat) {
            let obj = {};
            let check_flag = false;
            let eventType = data.event_type;
            let username = data.username;
            for (let k of ans) {
              if (k.label === username) {
                check_flag = true;
                if (this.radarChartLabels.indexOf(eventType) != -1) {
                  let index = this.radarChartLabels.indexOf(eventType);
                  k.data[index] += 1;
                }
              }
            }
            if (!check_flag) {
              obj['data'] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
              obj['label'] = username;
              ans.push(obj);
            }
          }
          this.radarChartData = ans;
          this.spider_flag = true;
        }
      )
    } else {
      this.data = [];
      this.horizontal_flag = false;
      this.spider_flag = false;
      this.loadDateWiseData();
      this.heading = 'Event counter - Date wise';
    }
  }


}
