import {Component, Input, OnInit} from '@angular/core';
import {VoitureModel} from "../../model/VoitureModel";
import {ClientModel} from "../../model/ClientModel";
import {ClientService} from "../../services/client.service";
import {VoitureService} from "../../services/voiture.service";

@Component({
  selector: 'app-voture-details',
  templateUrl: './voture-details.component.html',
  styleUrls: ['./voture-details.component.scss']
})
export class VotureDetailsComponent implements OnInit {


  @Input() voitureList: VoitureModel[]; // decorate the property with @Input()
  search: any;
  id;

  constructor(private clientService: ClientService,
              private voitureService: VoitureService) {

  }

  ngOnInit(): void {
  }


  showDetails(id: any) {

    this.clientService.getDetailsClients(id)
      .subscribe((data: ClientModel) => {
        console.log("Data Details = ", data);
        this.voitureList = data.vehicleList;
        // this.listOfData4 = data;

        console.log("Data listOfData3 = ", this.voitureList);

        // this.entretien = data.entretienAndFixes;
        console.log("Data  = ", data);


        // console.log("Data entretien = ",this.entretien);

      })
    // this.isVisible2 = true
  }


  searchDataV() {
    console.log("-------> search Data", this.search)
    this.voitureService.search(this.search).subscribe(
      (data:VoitureModel[]) =>{
        console.log("---------> DATA FILTER",data)
        if (data)
          this.voitureList= data;
        else
          this.voitureList = []

      }
    )
  }
}
