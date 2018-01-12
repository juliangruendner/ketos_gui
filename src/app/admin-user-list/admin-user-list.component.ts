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

  create_username : string;
  create_first_name : string;
  create_last_name : string;
  create_email : string;
  create_password : string;

  edit_password : string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  clearCreateInput() {
    this.create_username = this.create_first_name = this.create_last_name = this.create_email = this.create_password = null;
  }

  create() {
    var u : User = new User();
    u.username = this.create_username;
    u.first_name = this.create_first_name;
    u.last_name = this.create_last_name;
    u.email = this.create_email;
    u.password = this.create_password;

    this.usersService.post(u).subscribe(u => {
      this.users.push(u);
    });
  }

  openEditModal(user: User) {
    this.edit_password = null;
    this.user = user;
  }

  edit() {
    if(this.edit_password) {
      this.user.password = this.edit_password;
    }

    this.usersService.putSingle(this.user.id, this.user).subscribe(u => {
      for(var i = 0; i < this.users.length; i++) {
        if(u.id == this.users[i].id) {
          this.users[i] = u;
          return;
        }
      }
    });
  }

  delete() {
    this.usersService.delete(this.user.id).subscribe(id => {
      var tmp : User[] = [];
      for(var i = 0; i < this.users.length; i++) {
        if(this.users[i].id == id.id) {
          continue;
        }
        tmp.push(this.users[i]);
      }
      this.users = tmp;
    });
  }

}
