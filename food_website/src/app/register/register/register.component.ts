import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {User} from '../../models/User';
import {Account} from '../../models/Account';
import {birthdayValidate} from '../../custome-validate/birthday_validate';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  imageDefault = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';
  imageShowScreen;
  imageToUpFireBase = new Array<any>();
  imageToSave;
  duplicateAccountName;
  duplicatePhone;
  duplicateEmail;
  duplicateIdentity;
  private checkPasswordMessage: string;
  messageImage: string;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.pattern(/[a-z0-9]{6,20}/)]],
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: [''],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(100)]],
      identity: ['', [Validators.required, Validators.pattern(/[0-9]{9}/)]],
      birthday: ['', [Validators.required, birthdayValidate]],
      phone: ['', [Validators.required, Validators.pattern('(0|84)\\d{9}')]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(([a-zA-Z0-9 ])?[a-zA-Z]*)*$/)]]
    });
  }

  async submitForm() {

    if (this.imageToUpFireBase) {
      await this.addImageToFireBase();
    }

    const newUser: User = {
      userName: this.formRegister.controls.userName.value,
      email: this.formRegister.controls.email.value,
      phone: this.formRegister.controls.phone.value,
      identity: this.formRegister.controls.identity.value,
      birthday: this.formRegister.controls.birthday.value,
      address: this.formRegister.controls.address.value,
    };

    const newAccount: Account = {
      accountName: this.formRegister.controls.accountName.value,
      accountPassword: this.formRegister.controls.password.value,
      enable: 1,
      user: newUser
    };

    if (this.imageToSave) {
      newUser.avatar = this.imageToSave;
    } else {
      newUser.avatar = this.imageDefault;
    }

    this.registerService.checkDuplicate(newAccount.accountName, newAccount.user.phone, newAccount.user.email, newAccount.user.identity)
      .subscribe(data => {
        if (data == null) {
          this.registerService.saveAccount(newAccount).subscribe();
        } else {
          if (data.accountName) {
            this.duplicateAccountName = 'Account is exits';
          }
          if (data.phone) {
            this.duplicatePhone = 'Phone is exits';
          }
          if (data.email) {
            this.duplicateEmail = 'Email is exits';
          }
          if (data.identity) {
            this.duplicateIdentity = 'Identity is exits';
          }
        }
      });
  }

  checkConfirmPassword() {
    if (this.password.value) {
      if (this.password.value !== this.confirmPassword.value) {
        this.checkPasswordMessage = 'Confirm do not map password';
      } else {
        this.checkPasswordMessage = null;
      }
    } else {
      this.checkPasswordMessage = null;
    }
  }

  checkPassword() {
    if (this.confirmPassword.value) {
      if (this.password.value !== this.confirmPassword.value) {
        this.checkPasswordMessage = 'Confirm do not map password';
      } else {
        this.checkPasswordMessage = null;
      }
    } else {
      this.checkPasswordMessage = null;
    }
  }

  get password() {
    return this.formRegister.get('password');
  }

  get confirmPassword() {
    return this.formRegister.get('confirmPassword');
  }

  importImage(event) {
    const file = event.target.files;
    const name = file[0].type;
    const size = file[0].size;
    if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
      if (size <= 1000000) {
        this.messageImage = null;
        this.imageToUpFireBase.push(file);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.imageShowScreen = event.target.result;
        };
      } else {
        this.messageImage = 'Capacity of file is to big';
        return;
      }
    } else {
      this.messageImage = 'Please choose the image';
      return;
    }
    this.messageImage = null;
  }

  addImageToFireBase() {
    return new Promise(resolve => {
      Promise.all(this.imageToUpFireBase.map(file =>
        new Promise(resolve => {
          const name = file.name;
          const fileRef = this.storage.ref('images/' + name);
          const task = fileRef.put(file);
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL()
                .subscribe((url) => {
                  this.imageToSave = url;
                  resolve(1);
                });
            })).subscribe();
        }))).then(() => {
        resolve(1);
      });
    });
  }
}
