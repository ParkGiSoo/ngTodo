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

  register() {
    // jquery로 가져온값을 세팅
    this.form.controls['postcode'].setValue($('.postcodify_postcode5').val());
    this.form.controls['address'].setValue($('.postcodify_address').val());

    if (!this.form.controls['isTerm'].value) {
      this.snackBar.open('이용약관에 동의하세요.', null, {duration: 2000});
      return;
    }

    if (!this.form.controls['isInfo'].value) {
      this.snackBar.open('개인정보이용에 동의하세요.', null, {duration: 2000});
      return;
    }

    if (!this.form.valid) {
      this.snackBar.open('필수입력 사항을 확인하세요.', null, {duration: 2000});
      return;
    }

    this.member.nickname = this.form.controls['nickname'].value;

    this.userService.signUp(this.member)
      .subscribe(body => {
        if (body.result === 0) {
          localStorage.setItem('token', body.data['token']);

          // 페이지 리프레쉬
          if (this.authGuard.redirectUrl) {
            this.router.navigateByUrl(this.authGuard.redirectUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        } else if (body.result === 100) {
          this.snackBar.open('닉네임이 중복입니다.', null, {duration: 2000});
        } else {
          this.snackBar.open('회원가입에 실패하였습니다.', null, {duration: 2000});
        }
      });
  }
}
