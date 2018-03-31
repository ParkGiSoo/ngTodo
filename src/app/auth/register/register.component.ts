import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberVO} from '../../domain/member.vo';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {UserService} from '../../user.service';
import {AuthGuardService} from '../auth-guard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  member: MemberVO;

  constructor(private snackBar: MatSnackBar, private userService: UserService, private authGuard: AuthGuardService
    , private router: Router, private fb: FormBuilder) {

    this.form = this.fb.group({
      nickname: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      isTerm: new FormControl(null, [Validators.required]),
      isInfo: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null),
      address: new FormControl(null),
      birthday: new FormControl(null),
    });
  }

  ngOnInit() {
    this.member = JSON.parse(localStorage.getItem('member'));
  }


}
