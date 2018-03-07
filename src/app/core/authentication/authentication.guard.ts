import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  publicRoutes : string[] = [
    "/annotool"
  ];

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }

    console.log(state);

    if (this.publicRoutes.includes(state.url)){
      return true;
    }

    log.debug('Not authenticated, redirecting...');
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

}
