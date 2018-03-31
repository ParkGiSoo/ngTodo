import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {PageVO} from '../../domain/page.vo';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: NewsVO[];
  page: PageVO;

  constructor(private adminService: AdminService) {
    this.page = new PageVO(0, 5, 0);
  }

  ngOnInit() {
    const page = {
      start_index: this.page.pageSize * this.page.pageIndex,  // 페이지사이즈 * (현재페이지-1)
      page_size: this.page.pageSize
    };
    this.adminService.findNews(page)
      .subscribe(body => {
        console.log(body);
        this.newsList = body.data;
        // total 값 저장
        this.page.totalCount = body.total;
      });
  }

}
