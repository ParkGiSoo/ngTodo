import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  naverUrl: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    // naver login url 얻기 (그림 1번)
    this.userService.getSocial("naver2")
      .subscribe(value => {
        this.naverUrl = value['url'];
      });
  }
}
