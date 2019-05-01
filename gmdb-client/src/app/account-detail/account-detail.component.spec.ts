import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailComponent } from './account-detail.component';
import { UserService } from '../user.service';
import { User } from '../user';


class MockUserService {
  loggedInUser =  {
    id: 1,
    username: "guest",
    password: "password",
    email: "email@email.com" 
  }

  updateUser(user: User) {

  }
  getLoggedInUser(){
    return this.loggedInUser;
  }
}

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ],
      providers: [
        {provide: UserService, useClass: MockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the logged in user from the service', () =>  {
    const user = {
      id: 1,
      username: "guest",
      password: "password",
      email: "email@email.com" 
    };

    expect(component.user).toEqual(user);
  });

  it('should display the users details', () => {
    expect(fixture.nativeElement.querySelector('#username').textContent).toEqual('guest');
    expect(fixture.nativeElement.querySelector('#email').textContent).toEqual('email@email.com');
  });
});
