import {VoitureModel} from "./VoitureModel";

export class ClientModel {
  id:number;
  name:string;
  cin:string;
  tel:string;
  dateDebut:Date;
  dateFin:Date;
  numberDay:any;
  total:any;
  nat:string;
  matricule:string;
  nPermis:string;
  adressMaroc:string;
  adressEtranger:string;
  vehicleList:VoitureModel[];
}
