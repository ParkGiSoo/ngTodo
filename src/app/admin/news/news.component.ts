import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {NewsVo} from "../../domain/news.vo";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: NewsVo[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const page = {
      start_index: 0,
      page_size: 5
    };
    this.adminService.findNews(page)
      .subscribe(body => console.log(body));
  }

}
