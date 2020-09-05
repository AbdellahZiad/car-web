import { Component, OnInit } from '@angular/core';
import {SurveyModel} from "../../model/SurveyModel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SurveyService} from "../welcome/services/survey.service";
import {VoitureService} from "../../services/voiture.service";
import {VoitureModel} from "../../model/VoitureModel";

@Component({
  selector: 'app-search-advanced',
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.scss']
})
export class SearchAdvancedComponent implements OnInit {
  dateFormat = 'dd/MM/yyyy';
  listOfData: SurveyModel[];
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = false;
  isFormCollapsed: boolean;
  voitures: any;


  constructor(private fb: FormBuilder, private surveyService: SurveyService,
              private voitureService: VoitureService) {
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  // this.controlArray.forEach((c, index) => {
  //   c.show = this.isCollapse ? index < 6 : true;
  // });
}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      matricule: null,
      dateLocation: null,
      marque: null,
      disponible: null,
      nMin: null,
      nMAx: null,
      prix: null,
      dateAfter: null,
    });
  this.getAllUsers();
}

  resetForm(): void {
    this.validateForm.reset();
    this.getAllUsers();
}


  getSurveyList() {
    this.surveyService.getSurveyUserList()
      .subscribe(data => {
        console.log('data =>', data);
        this.listOfData = Object.assign(data);
        console.log("--> getSurveyList LIST OF DATA", this.listOfData);
      });
  }
  private getAllUsers() {
    this.voitureService.getAllVoiture()
      .subscribe(
        data => {
          this.voitures = data;
          console.log("---voitures", this.voitures);

        }
      )
  }

  searchData() {
    this.voitureService.sercheAdv(this.validateForm.value)
      .subscribe(data => {
        this.voitures = data;
        console.log("------------> After FILTER = ", this.voitures);
      });
  }
}
