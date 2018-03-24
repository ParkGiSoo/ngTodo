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

  constructor(private userService: UserService) {
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
}
