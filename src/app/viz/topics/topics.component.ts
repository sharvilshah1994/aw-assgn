import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../backend.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  graph_flag = false;

  constructor(backend: BackendService) {
    backend.getAllLogs().subscribe(
      (dat: any) => {
        let ans = [];
        for (let data of dat) {
          let check_flag = false;
          let obj = {};
          let target = data.target;
          let date = new Date(parseInt(data.timestamp));
          let date_format = date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
          let username = data.username;

          if (target != null) {
            for (let s of ans) {
              let ins = {};
              if (s.name === username) {
                check_flag = true;
                let flag = false;
                for (let d of s.series) {
                  if (d.name === date_format && target.indexOf('submit') != -1) {
                    flag = true;
                    d.value += 1;
                  }
                }
                if (!flag) {
                  ins['name'] = date_format;
                  if (target.indexOf('submit') != -1) {
                    ins['value'] = 1;
                  } else {
                    ins['value'] = 0;
                  }
                  s.series.push(ins);
                }
              }
            }

            if (!check_flag) {
              obj['name'] = username;
              if (target.indexOf('submit') != -1){
                obj['series'] = [{'name': date_format, 'value': 1}];
              } else {
                obj['series'] = [{'name': date_format, 'value': 0}];
              }
              ans.push(obj);
            }
          }
          console.log(ans);
          this.multi = ans;
          this.graph_flag = true;
        }
      }
    );
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }


}
