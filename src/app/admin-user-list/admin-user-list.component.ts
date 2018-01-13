import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  users : User[] = [];
  user : User = new User();

  is_form_create : boolean;
  form_username : string;
  form_first_name : string;
  form_last_name : string;
  form_email : string;
  form_password : string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  clearFormInput() {
    this.form_username = this.form_first_name = this.form_last_name = this.form_email = this.form_password = null;
  }

  create() {
    var u : User = new User();
    u.username = this.form_username;
    u.first_name = this.form_first_name;
    u.last_name = this.form_last_name;
    u.email = this.form_email;
    u.password = this.form_password;

    this.usersService.post(u).subscribe(u => {
      this.users.push(u);
    });
  }

  setFormInput(user: User) {
    this.form_username = user.username;
    this.form_first_name = user.first_name;
    this.form_last_name = user.last_name;
    this.form_email = user.email;
    this.form_password = null;
    this.user = user;
  }

  edit() {
    this.user.username = this.form_username;
    this.user.first_name = this.form_first_name;
    this.user.last_name = this.form_last_name;
    this.user.email = this.form_email;
    this.user.password = this.form_password; // is null or content of password form field

    this.usersService.putSingle(this.user.id, this.user).subscribe(u => {
      this.users[this.users.findIndex(user => u.id === user.id)] = u;
    });
  }

  delete() {
    this.usersService.delete(this.user.id).subscribe(id => {
      this.users.splice(this.users.findIndex(user => id.id === user.id), 1);
    });
  }

}
