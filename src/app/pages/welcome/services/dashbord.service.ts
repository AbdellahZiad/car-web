import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {saveAs} from "file-saver";
import {DatePipe} from "@angular/common";
import {endpoint} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http: HttpClient,public datepipe: DatePipe) { }


  getSurveyStatus() {
    return this.http.get(endpoint + "api/voiture/status");
  }
  getDocStatus() {
    return this.http.get(endpoint + "api/voiture/status");
  }

  getTemplateManStatus() {
    return this.http.get(endpoint + "api/voiture/status");

  }

  export() {
    let url = endpoint + "api/client/export";
    this.http.get(url, {responseType: 'blob'}).subscribe((x: Blob) => {
      console.log("----> X =",x);
      saveAs(x, "SUPRATEAM-REPORT-"+this.datepipe.transform(new Date(), 'dd_MM_yyyy.HH.mm')+".xlsx");

    });
    // return this.http.get(endpoint + "api/survey/export");
    // this.http.get(endpoint.concat("api/survey/export"));
  }
  uploadFile(file) {

    let formData = new FormData();
    formData.append("file", file, file.name);
    const uploadBy = "Abdellah ZIAD";
    return this.http.post(endpoint + 'api/upload', formData, {responseType:"text"});

    // const uploadHttpOptions = {
    //   headers: new HttpHeaders({'Accept': 'application/json'})
    // };
    // const formData = new FormData();
    // formData.append('file', x.file.originFileObj);
    // const uploadBy = "Abdellah ZIAD";
    // return this.http.post(endpoint + 'api/upload/'+uploadBy, formData, uploadHttpOptions);

  }
}
