import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {TokenStorageService} from './token-storage';


@Injectable({
  providedIn: 'root'
})
/**
 * @author PhinNL
 * auth guard for member page
 */
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private tokenStorage: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenStorage.isLogged()) {
      if (this.tokenStorage.getRoles().includes('MEMBER')) {
        return true;
      }
    }

    this.router.navigateByUrl('/login');
    return false;
  }

}
