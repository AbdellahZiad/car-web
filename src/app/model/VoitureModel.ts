import {ClientModel} from "./ClientModel";
import {EntretienModel} from "./EntretienModel";

export class VoitureModel {
  id: number;
  marque: string;
  matricule: string;
  model: string;
  prixUnitaireTTC:any;
  total:any;
  totalEntretien:any;
  totalJours:any;
  dispo:any;
  disponible:any;
  client: ClientModel[];
  dateFin:any;
  entretienAndFixes:EntretienModel[];



  constructor() {
    this.id = null;
    this.marque = null;
    this.matricule = null;
    this.model=null;
    this.prixUnitaireTTC=null;
    this.total = null;
    this.totalEntretien = null;
    this.totalJours = null;
    this.dispo=null;
    this.disponible=null;
    this.client = [];
    this.dateFin = null;
    this.entretienAndFixes=[];
  }
}
