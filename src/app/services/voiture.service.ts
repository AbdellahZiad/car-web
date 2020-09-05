import {Injectable} from '@angular/core';
import {endpoint} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {VoitureModel} from "../model/VoitureModel";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) {
  }


  getAllVoiture() {
    return this.http.get(endpoint + "api/voiture");
  }

  deleteVoiture(id: any) {
    console.log("id from service = ", id);
    return this.http.delete(endpoint + "api/voiture/delete/" + id,
      {responseType: 'text'});

  }

  saveVoiture(user: VoitureModel) {
    console.log("ADD or SAVE USER ", user);
    return this.http.post(endpoint + "api/voiture/add", user);

  }

  search(search: any) {
    return this.http.get(endpoint + "api/voiture/search?filter=" + search);

  }

  getDetailsVoiture(id: any) {
    return this.http.get(endpoint + "api/voiture/details/" + id);

  }

  sercheAdv(value: any) {
    return this.http.post(endpoint + "api/voiture/search-adv",value);

  }
}
