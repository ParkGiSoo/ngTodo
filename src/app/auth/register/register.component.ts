import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberVO} from '../../domain/member.vo';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {UserService} from '../../user.service';
import {AuthGuardService} from '../auth-guard.service';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  member: MemberVO;
  url = "//d1p7wdleee1q2z.cloudfront.net/post/search.min.js";

  constructor(private snackBar: MatSnackBar, private userService: UserService, private authGuard: AuthGuardService
    , private router: Router, private fb: FormBuilder, private el: ElementRef) {

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

    // index.html에서 로딩되는 라이브러리를 회원가입 페이지에서만 로딩되도록 변경
    // $("#postcode").postcodifyPopUp();
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.url;
      script.type = 'text/javascript';
      script.async = true;
      this.el.nativeElement.appendChild(script);
      resolve(true);
    }).then(() => {
      setTimeout(() => {
        $(function() { $("#postcode").postcodifyPopUp(); });
        // jquery로 폼이 바뀌면 angular로 인식이 안되기 때문에 이벤트를 받아서 angular폼을 세팅
        $('.postcodify_popup_layer').on('click', () => {
          console.log('click');
          this.form.controls['postcode'].setValue($('.postcodify_postcode5').val());
          this.form.controls['address'].setValue($('.postcodify_address').val());
        });
      }, 2000);
    });

  }


}
