import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  users : User[] = [];

  is_form_create : boolean;
  form_user : User = new User();
  userForm : FormGroup;

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    });
    this.userForm = this.formBuilder.group({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        this.takenNameValidator()
      ]),
    });
  }

  takenNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const names = this.users.map(u => u.username);
      return names.includes(control.value) ? {'takenName': {value: control.value}} : null;
    };
  }

  clearForm() {
    this.form_user = new User();
    this.userForm.reset();
  }

  create() {
    // Write back fields of userForm to form user
    _.assignIn(this.form_user, this.userForm.value);

    this.usersService.post(this.form_user).subscribe(u => {
      this.users.push(u);
    });
  }

  setForm(user: User) {
    this.form_user = _.clone(user);

     // Set fields of userForm to fields of form user
    this.userForm.reset();
    this.userForm.patchValue(_.clone(user));
  }

  edit() {
    // Write back fields of userForm to form user
    _.assignIn(this.form_user, this.userForm.value);

    this.usersService.putSingle(this.form_user.id, this.form_user).subscribe(u => {
      this.users[this.users.findIndex(user => u.id === user.id)] = u;
    });
  }

  delete() {
    this.usersService.delete(this.form_user.id).subscribe(id => {
      this.users.splice(this.users.findIndex(user => id.id === user.id), 1);
    });
  }

}
