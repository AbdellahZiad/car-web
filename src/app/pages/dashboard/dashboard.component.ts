import {Component,  OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription} from "rxjs";
import {DashbordService} from "../welcome/services/dashbord.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Highcharts = Highcharts;

  jobLoading = true;
  questionLoading = true;
  updateFlag1: boolean = false;
  updateFlag2: boolean = false;
  jobData;
  templateMStatus;
  jobOptions;
  questionOptions;
  timer: Subscription;
  colors1 = ['#F04545', '#1C81D8', '#7CC76C', '#F04545'];
  colors2 = ['#F0AC45', '#4cbeb5', '#F04545', '#999999', '#7CC76C', '#1C81D8'];

  constructor(private dashboardService: DashbordService) {
  }

  ngOnInit() {
    // this.timer = interval(3000).subscribe(() => this.onTimeOut());
    this.onTimeOut();
    this.jobData = {};
    this.templateMStatus = {};
    this.jobOptions = {
      chart: {
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        text: null,
        style: {
          fontSize: '54px'
        },
        verticalAlign: 'middle',
        floating: true
      },

      plotOptions: {
        pie: {
          allowPointSelect: false,
          // showInLegend: true,
          dataLabels: {
            enabled: false,
          },
          colors: this.colors1
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        type: 'pie',
        innerSize: '70%',
        data: null,
      }]
    };

    this.questionOptions = {
      chart: {
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        text: null,
        style: {
          fontSize: '54px'
        },
        verticalAlign: 'middle',
        floating: false
      },

      plotOptions: {
        pie: {
          allowPointSelect: false,
          // showInLegend: true,
          dataLabels: {
            enabled: false,
          },
          colors: this.colors2
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        type: 'pie',
        innerSize: '70%',
        data: null
      }]
    };

    this.dashboardService.getDocStatus().subscribe((response: any) => {
      console.log("--> response 1",response);
      this.jobLoading = false;
      this.jobData.count = response.count;
      this.jobData.data = [{
        name: 'Non disponible',
        y: response.nonDispo
      }, {
        name: 'Disponible',
        y: response.dispo
      }, {
        name: 'Disponible pendant cette semaine',
        y: response.semain
      }
      ];

      this.jobOptions.series[0].data = this.jobData.data;
    });
    this.dashboardService.getTemplateManStatus().subscribe((response: any) => {
      console.log("--> response 2",response);

      this.questionLoading = false;
      this.parseQuestionStatus(response);
    });


  }

  parseQuestionStatus(questionStatus) {
    this.templateMStatus.count = questionStatus.count;
    this.templateMStatus.data = [{
      name: 'Declined',
      y: questionStatus.declined
    }, {
      name: 'Accepted',
      y: questionStatus.accepted
    }, {
      name: 'Referral',
      y: questionStatus.referral
    }
    ];

    console.log("------>   this.questionStatus",  this.templateMStatus);
    this.questionOptions.series[0].data = this.templateMStatus.data;
  }

  onTimeOut() {
    if (!this.jobLoading) {
      this.dashboardService.getDocStatus()
        .subscribe((response: any) => {
          console.log("--------> response 3",response);
          this.jobLoading = false;
          this.jobData.count = response.count;
          this.jobData.data = [{
            name: 'Declined',
            y: response.declined
          }, {
            name: 'Accepted',
            y: response.accepted
          }, {
            name: 'Referral',
            y: response.referral
          }
          ];

          this.jobOptions.series[0].data = this.jobData.data;
          this.updateFlag1 = true;
        });
    }
    if (!this.questionLoading) {
      this.dashboardService.getTemplateManStatus()
        .subscribe((response: any) => {
          console.log("--------> response 4",response);
          this.questionLoading = false;
          this.parseQuestionStatus(response);
          this.updateFlag2 = true;
        });
    }
  }

  // ngOnDestroy(): void {
  //   if (this.timer) this.timer.unsubscribe();
  // }

  import() {

  }

  export() {
    this.dashboardService.export();

  }
}
