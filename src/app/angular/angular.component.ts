import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations:[
    trigger('flyInOut',[
      transition('void => in',[
        style({opacity:0,transform:'translate(-100%,0)'}),
        animate(300,style({opacity:1,transform:'translate(0,0)'}))
      ])
    ])
  ]
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[];
  todoVO = new TodoVO();
  //기존값을 저장할 Map 객체 정의
  tempTodoList: Map<number, TodoVO>;

  constructor(private userService: UserService) {
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
    todo.isEdited = !todo.isEdited;
    //기존값 저장
    this.tempTodoList.set(todo.todo_id,todo);
  }
  restore(todo: TodoVO) {
    todo.isEdited = !todo.isEdited;
    //기존값 복원
    const tempTodo = this.tempTodoList.get(todo.todo_id);
    todo = tempTodo;
  }
}
