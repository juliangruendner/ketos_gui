import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  clearForm() {
    this.form_user = new User();
  }

  create() {
    this.usersService.post(this.form_user).subscribe(u => {
      this.users.push(u);
    });
  }

  setForm(user: User) {
    this.form_user = _.clone(user);
  }

  edit() {
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
