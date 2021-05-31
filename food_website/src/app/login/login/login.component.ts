import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication-service';
import JwtRequest from '../../services/authentication/JwtRequest';
import {TokenStorageService} from '../../services/authentication/token-storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isCorrect;
  accountName: any;
  password: any;
  remember;

  constructor(private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorageService.isLogged()) {
      if (this.tokenStorageService.getRoles()[0] === 'MEMBER') {
        this.router.navigateByUrl('');
      } else {
        this.router.navigateByUrl('/admin/product-management/list');
      }
    }
  }

  login() {
    this.authenticationService.sendLogin(new JwtRequest(this.accountName, this.password)).subscribe(data => {
      console.log(data);
      if (data.jwtToken === 'INVALID_CREDENTIALS') {
        this.isCorrect = false;
      } else {
        this.tokenStorageService.saveData(data, this.remember);
        window.location.reload();
      }
    });
  }

}
