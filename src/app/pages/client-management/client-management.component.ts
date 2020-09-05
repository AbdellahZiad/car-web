import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../model/UserModel";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ClientService} from "../../services/client.service";
import {VoitureModel} from "../../model/VoitureModel";
import {ClientModel} from "../../model/ClientModel";
import {VoitureService} from "../../services/voiture.service";

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent implements OnInit {

  isVisible = false;
  isVisible2 = false;
  // listOfData: any;
  id: any;
  mode: Boolean;
  submitted = false;
  pw: boolean = false;
  passwordVisible = false;
  password?: string;
  isCollapse = false;
  isFormCollapsed: boolean;
  search: any;
  voiturList: VoitureModel [];

  @Input() clients: ClientModel[]; // decorate the property with @Input()
  @Input() newClient: boolean = true; // decorate the property with @Input()

  // [
  // {user: 'Admin', email: 'admin@scor.com', role: 'admin', creationDate: '07/05/2017', validUntil: '', active: 'Y'},
  // {user: 'Admin', email: 'admin@scor.com', role: 'admin', creationDate: '09/11/2019', validUntil: '09/11/2024', active: 'Y'},
  // {user: 'Admin', email: 'admin@scor.com', role: 'admin', creationDate: '07/12/2018', validUntil: '31/12/2020', active: 'Y'}];
  validateForm!: FormGroup;
  validateFormSearch: FormGroup;
  filterForm: FormGroup;
  selectedUser: UserModel;
  roles: [
    {
      id: 1,
      name: "ADMIN"
    },
    {
      id: 2,
      name: "USER"
    }
  ];
  title: any;
  showV: boolean = false;
  listOfData3: VoitureModel[];
  totalData: ClientModel = {
    id: null,
    nom: '',
    prenom:'',
    cin: '',
    tel: '',
    dateDebut: null,
    dateFin: null,
    numberDay: '',
    total: '',
    nat: '',
    matricule: '',
    nPermis: '',
    adressMaroc: '',
    adressEtranger: '',
    totalJours: null,
    totalPrix: null,
    vehicleList: [],
    nom1:null,
    prenom1:null,
    name1:null,
    cin1:null,
    tel1:null,
    nat1:null,
    nPermis1:null,
    dateFinPermis1:null,
    adressMaroc1:null,
    adressEtranger1:null,
    adressEtranger2:null
  };
  listOfData4: any;


  constructor(private msg: NzMessageService,
              private modal: NzModalService,
              private fb: FormBuilder,
              private clientService: ClientService,
              private voitureService: VoitureService) {

    this.validateForm = this.fb.group({
      id: null,
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      cin: [null],
      tel: [null, [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      dateDebut: [null, [Validators.required]],
      dateFin: [null, [Validators.required]],
      nom1: [null,],
      prenom1: [null,],
      cin1: [null],
      tel1: [null,],
      numberDay: [null,],
      total: [null,],
      nameCdt: [null,],
      dateFinPermis: [null,],
      dateFinPermis1: [null,],
      livraison: [null,],
      recuperation: [null,],
      matricule: [null,],
      nat: [null],
      nPermis: [null],
      adressMaroc: [null,],
      adressEtranger: [null,],
      nat1: [null],
      nPermis1: [null],
      adressMaroc1: [null,],
      adressEtranger1: [null,],
      name1:[null],
      adressEtranger2:[null],

    });

    // this.getAllUsers();
    // this.getVoitureList();

  }

  ngOnInit() {
    console.log("------> LIST CLIENT ", this.clients);
    this.getAllUsers();
    this.getVoitureList();

  }

  showModal(user): void {
    console.log("user = ", user);

    if (user == null) {
      this.pw = false;
      this.validateForm.reset();
      this.title = "Nouveau Client";
      this.addV = true;
    } else {
      this.selectedUser = user;
      this.validateForm.patchValue(user);
      this.title = "Modifier Client";
      this.pw = true;
      this.addV = false;
    }
    this.isVisible = true;

  }

  resetForm(): void {
    this.validateFormSearch.reset();
  }

  handleOk(): void {

    console.log("Form data OK = ", this.validateForm.valid);
    this.selectedUser = this.validateForm.value;

    if (this.validateForm.valid) {
      this.clientService.saveClient(this.validateForm.value)
        .subscribe(
          data => {
            this.msg.success("User saved successfully");
            this.showV = true;
            this.getAllUsers()

          }, error => {
            this.msg.error(error.error.message);
            console.log("--->ERROR", error);
            this.getAllUsers()
          }
        );
      this.twoCond = false;
      this.isVisible = false;
      this.validateForm.reset();
    } else {
      this.isVisible = true;
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }

    }
    // this.getAllUsers();

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  deleteUser(id) {
    this.id = id;
    this.modal.confirm({
      nzTitle: 'Confirm Delete ',
      nzContent: "Are you sure you want to delete this user?",
      nzOkText: 'confirm Delete ',
      nzCancelText: 'Cancel Delete',
      nzOnOk: () => this.confirmDelete(),
      nzOnCancel: () => this.closeSubscription()
    });

  }

  private confirmDelete() {

    this.clientService.deleteClient(this.id)
      .subscribe(
        data => {
          console.log("---> data after delete", data);
          this.msg.success("User deleted successfully");

          this.getAllUsers()
        },
        error => {

          console.log("--->ERROR", error);
        }
      );


  }

  private closeSubscription() {
    console.log("Cancel");

  }

  private getAllUsers() {
    this.clientService.getAllClient()
      .subscribe(
        (data: ClientModel[]) => {
          console.log("---data", data);
          this.clients = data;

        }
      )
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.pw.value) {
      return {confirm: true, error: true};
    }
    return {};
  };
  twoCond: boolean = false;
  addV: boolean = true;


  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


  showOrHidePw() {
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    // this.controlArray.forEach((c, index) => {
    //   c.show = this.isCollapse ? index < 6 : true;
    // });
  }

  searchData(eve?:any) {
    console.log("-----------> SEARCH", this.search);
    this.clientService.search(this.search).subscribe(
      (data: ClientModel[]) => this.clients = data
    )

  }

  getVoiture() {
    console.log("----->search", this.search);
  }

  private getVoitureList() {
    this.clientService.getAllVoiture().subscribe(
      (data: VoitureModel[]) => {
        this.voiturList = data;
        console.log("----------> dataV", data)
      }
    )
  }

  onKey(event: any) {
    console.log("---------> event.target.value", event.target.value);
    this.voiturList
      .find(ele => ele.marque == event.target.value || ele.matricule == event.target.matricule)

    console.log("-----------------> FIIIND", this.voiturList
      .find(ele => ele.marque == event.target.value || ele.matricule == event.target.matricule))
  }

  showDetails(id: any) {

    this.clientService.getDetailsClients(id)
      .subscribe((data: ClientModel) => {
        console.log("Data Details = ", data);
        this.listOfData3 = data.vehicleList;
        this.totalData = data;
        // this.listOfData4 = data;

        console.log("Data totalData = ", this.totalData);

        // this.entretien = data.entretienAndFixes;
        console.log("Data data = ", data);
        // console.log("Data entretien = ",this.entretien);

      })
    this.isVisible2 = true
  }

  searchDataV() {
    console.log("-------> search Data", this.search)
    this.voitureService.search(this.search).subscribe(
      (data: VoitureModel[]) => {
        console.log("---------> DATA FILTER", data)
        if (data)
          this.listOfData3 = data;
        else
          this.listOfData3 = []

      }
    )
  }

  addConducteur() {
    this.twoCond = true;
  }
}



