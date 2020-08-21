import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {VoitureService} from "../../services/voiture.service";
import {VoitureModel} from "../../model/VoitureModel";
import {ClientModel} from "../../model/ClientModel";
import {EntretienModel} from "../../model/EntretienModel";

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.scss']
})
export class VehicleManagementComponent implements OnInit {

  isVisible = false;
  isVisible2 = false;
  listOfData: any;
  listOfData3: ClientModel[];
  listOfData4: VoitureModel;
  entretien:EntretienModel[];
  clients: any[];
  id: any;
  mode: Boolean;
  submitted = false;
  pw: boolean = false;
  passwordVisible = false;
  password?: string;
  search: any;
  isUpdate: boolean = false;
  dispo = "OUI"
  // [
  // {user: 'Admin', email: 'admin@scor.com', role: 'admin', creationDate: '07/05/2017', validUntil: '', active: 'Y'},
  // {user: 'Admin', email: 'admin@scor.com', role: 'admin', creationDate: '09/11/2019', validUntil: '09/11/2024', active: 'Y'},
  // {user: 'Admin', email: 'admin@scor.com', role: 'admin', creationDate: '07/12/2018', validUntil: '31/12/2020', active: 'Y'}];
  validateForm!: FormGroup;


  @Input() voitures: any; // decorate the property with @Input()
  @Input() newVoiture: boolean = true; // decorate the property with @Input()

  selectedUser: VoitureModel;
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


  constructor(private msg: NzMessageService,
              private modal: NzModalService,
              private fb: FormBuilder,
              private voitureService: VoitureService) {

    this.validateForm = this.fb.group({
      id: '',
      marque: [null, [Validators.required]],
      matricule: [null, [Validators.required]],
      prixUnitaireTTC: [null, [Validators.required]],
      totalJours: [null,],
      total: [null,],
      totalEntretien: [null,],
      disponible: [null,],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // fullName: [null, [Validators.required]],
      // role: [null],
      // companyName: [null, [Validators.required]],
      // validUntil: [null, [Validators.required]],
      // createDate: '',
      // active: '',
    });

    this.newVoiture = true;
    this.getAllUsers();

  }

  ngOnInit() {
    this.getAllUsers();
  }

  showModal(user): void {
    console.log("user = ", user);

    if (user == null) {
      this.pw = false;
      this.validateForm.reset();
      this.title = "Nouvelle Voiture";
    } else {
      this.isUpdate = true;
      this.selectedUser = user;
      this.validateForm.patchValue(user);
      this.title = "Modifier Voiture";
      this.pw = true;
    }
    this.isVisible = true;

  }

  handleOk(): void {

    console.log("Form data OK = ", this.validateForm.valid);
    this.selectedUser = this.validateForm.value;

    if (this.validateForm.valid) {
      this.voitureService.saveVoiture(this.selectedUser)
        .subscribe(
          data => {
            this.msg.success("User saved successfully");
            this.getAllUsers()
          }, error => {
            this.msg.error(error.error.message);
            console.log("--->ERROR", error);
            this.getAllUsers()
          }
        );
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

    this.voitureService.deleteVoiture(this.id)
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
    this.voitureService.getAllVoiture()
      .subscribe(
        data => {
          console.log("---data", data);
          this.voitures = data;

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

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


  showOrHidePw() {
  }

  searchData() {
    console.log("-------> search Data")
    this.voitureService.search(this.search).subscribe(
      data=> this.voitures = data
    )
  }

  ShowDetails(id: any) {

    this.voitureService.getDetailsVoiture(id)
      .subscribe((data:VoitureModel) =>{
        console.log("Data Details = ",data);
        this.listOfData3 = data.client;
        this.listOfData4 = data;

        console.log("Data listOfData4 = ",this.listOfData4);

        this.entretien = data.entretienAndFixes;
        console.log("Data listOfData3 = ",this.listOfData3);
        console.log("Data entretien = ",this.entretien);

      })
    this.isVisible2 = true
  }
}

