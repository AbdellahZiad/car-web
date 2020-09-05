import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {endpoint} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private http: HttpClient) { }

  saveEntretien(clinet,id) {
    console.log("ADD or SAVE Entretien ",clinet);
    console.log("URL :",endpoint + "api/entretien/add/"+id);
    return this.http.post(endpoint + "api/entretien/add/"+id, clinet);
  }

  deleteEntretien(id: any) {
    console.log("id from service = ",id);
    return this.http.delete(endpoint + "api/entretien/delete/"+id,
      {responseType: 'text'});
  }

  getAllEntretien() {
    return this.http.get(endpoint + "api/entretien");
  }

  getAllVoiture() {
    return this.http.get(endpoint + "api/voiture");

  }

  search(search: any) {
    return this.http.get(endpoint + "api/entretien/search?filter="+search);

  }
}
