import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  user: User;
  changingPassword = false;
  passwordForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.minLength(6), Validators.required]]
    });
    this.user = this.userService.getLoggedInUser();
    this.user = {
      id: 1,
      username: "guest",
      password: "password",
      email: "email@email.com" 
    }  
  }

  toggleChangingPassword() {
    this.changingPassword = !this.changingPassword;
  }

  //return true on success
  changePassword():boolean {
    if(this.passwordForm.controls.newPassword.value === this.passwordForm.controls.confirmPassword.value){
      this.user.password = this.passwordForm.controls.newPassword.value;
      this.userService.updateUser(this.user);// tell the service to update on the backend!
      console.log(this.user.password);
      return true;
    }
    else{
      return false;
    }
  }

}
