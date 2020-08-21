import {Component, Input, OnInit} from '@angular/core';
import {VoitureModel} from "../../model/VoitureModel";
import {EntretienModel} from "../../model/EntretienModel";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../model/UserModel";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {EntretienService} from "../../services/entretien.service";

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.scss']
})
export class EntretienComponent implements OnInit {

  isVisible = false;
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

  @Input() entretiens: EntretienModel[]; // decorate the property with @Input()
  @Input() newEntretien: boolean = true; // decorate the property with @Input()

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
  private showV: boolean = false;


  constructor(private msg: NzMessageService,
              private modal: NzModalService,
              private fb: FormBuilder,
              private entretienService: EntretienService) {

    this.validateForm = this.fb.group({
      id: null,
      entretieAndRepar: [null, [Validators.required]],
      coute: [null,[Validators.required]]
    });

    // this.getAllUsers();
    // this.getVoitureList();

  }

  ngOnInit() {
    console.log("------> LIST Entretien ",this.entretiens);
    this.getAllUsers();
    this.getVoitureList();

  }

  showModal(user): void {
    console.log("user = ", user);

    if (user == null) {
      this.pw = false;
      this.validateForm.reset();
      this.title = "Nouveau Entretien";
    } else {
      this.selectedUser = user;
      this.validateForm.patchValue(user);
      this.title = "Modifier Entretien";
      this.pw = true;
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
      this.entretienService.saveEntretien(this.validateForm.value)
        .subscribe(
          data =>{
            this.msg.success("User saved successfully");
            this.showV = true;
            this.getAllUsers()

          },error => {
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

    this.entretienService.deleteEntretien(this.id)
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
    this.entretienService.getAllEntretien()
      .subscribe(
        (data:EntretienModel[]) => {
          console.log("---data", data);
          this.entretiens = data;

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

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    // this.controlArray.forEach((c, index) => {
    //   c.show = this.isCollapse ? index < 6 : true;
    // });
  }

  searchData() {
    console.log("-----------> SEARCH",this.search);
    this.entretienService.search(this.search).subscribe(
      (data:EntretienModel[])=> this.entretiens = data
    )

  }

  getVoiture() {
    console.log("----->search",this.search);
  }

  private getVoitureList() {
    this.entretienService.getAllVoiture().subscribe(
      (data:VoitureModel[])=>{
        this.voiturList = data
        console.log("----------> dataV",data)
      }

    )
  }

  onKey(event:any) {
    console.log("---------> event.target.value",event.target.value);
    this.voiturList
      .find(ele => ele.marque==event.target.value || ele.matricule==event.target.matricule)

    console.log("-----------------> FIIIND",this.voiturList
      .find(ele => ele.marque==event.target.value || ele.matricule==event.target.matricule))
  }
}



