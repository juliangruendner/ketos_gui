import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { MenuEntry } from './MenuEntry';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  entries : MenuEntry[] = []

  constructor(public auth: AuthenticationService, private router: Router) { 
    this.addEntry("Dashboard", "/home", "thumbnails");
    this.addEntry("Environments", "/environments", "desktop");
    this.addEntry("ML Models", "/mlmodels", "thumbnails");
    this.addEntry("Cohorts", "/cohorts", "users");
    this.addEntry("Data Requests", "/data", "table");
    this.addEntry("Feature Sets", "/feature-sets", "move");
    this.addEntry("Features", "/features", "bookmark");
    this.addEntry("Annotations", "/annotations", "list");
    this.addEntry("FHIR Resource", "/resource-config", "settings");
    this.addEntry("User management", "/admin-user-list", "user", auth.getUser().username=='admin');
    this.addEntry("Getting Started", "/gettingstarted", "info");
    this.addEntry("Logout", "/login", "sign-out");
  }

  gotoRoute(url: string){
    this.router.navigateByUrl(url);
  }

  addEntry(name: string, url: string, icon: string, isVisible: boolean = true){
    this.entries.push(new MenuEntry(name, url, icon, isVisible));
  }

  ngOnInit() {}

}
