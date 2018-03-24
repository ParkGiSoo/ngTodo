import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material";

import * as $ from 'jquery';
// declare var $: any;

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut',[
      state('in', style({opacity: 1, transform: 'translate(0,0)'})),
      transition('void => in',[
        style({opacity: 0, transform: 'translate(-100%,0)'}),
        animate(300)
      ]),
      transition('in => void',[
        // style({opacity: 1, transform: 'translate(0,0)'}),
        animate(300, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({opacity: 1, transform: 'translate(-50px,0)', offset: 0.7}),
          style({opacity: 0, transform: 'translate(100%,0) scale(2.0)', offset: 1.0}),
        ]))
      ])
    ])
  ]
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[];
  todoVO = new TodoVO();
  //기존값을 저장할 Map 객체 정의
  tempTodoList: Map<number, TodoVO>;

  constructor(private userService: UserService, private snackBer: MatSnackBar) {
    this.tempTodoList = new Map<number, TodoVO>();
  }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.userService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  addTodo() {
    this.userService.addTodo(this.todoVO)
      .subscribe(body => this.todoList.unshift(body));
  }

  save(todo: TodoVO) {
    //기존값 저장: todo 객체를 deep copy
    const tempTodo = Object.assign({},todo);
    this.tempTodoList.set(todo.todo_id,tempTodo);

    todo.isEdited = true;
  }
  restore(todo: TodoVO) {
    //기존값 복원
    const tempTodo = this.tempTodoList.get(todo.todo_id);
    Object.assign(todo, tempTodo);

    todo.isEdited = false;
  }

  modifyTodo(todo: TodoVO) {
    //todo 객체는 created,updated, isEdited가 모두 넘어간다.
    //그러므로 isFinished, todo, todo_id만 넘기는게 바람직하다.
    this.userService.modifyTodo(todo)
      .subscribe(body => {
        Object.assign(todo, body);
        todo.isEdited = false;
      });
  }

  removeTodo(todo_id: number, index: number) {
    const result = confirm('삭제하시겠습니까?');
    if (result) {
      this.userService.removeTodo(todo_id).subscribe(body =>{
        if (body.result === 0) {
          this.snackBer.open("삭제되었습니다.",null,{duration: 2000});
          // 모델 데이터 동기화
          this.todoList.splice(index, 1);
        }
      });
    }
  }

  slide() {
    $('.tbody').slideToggle();
  }
}
