import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule, MatExpansionModule, MatPaginatorModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminService} from './admin.service';
import { ViewComponent } from './news/view/view.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'news', component: NewsComponent, children: [
        {path: 'view/:news_id', component: ViewComponent}
      ]}
    ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  declarations: [AdminComponent, HomeComponent, NewsComponent, ViewComponent],
  providers: [AdminService]
})
export class AdminModule { }
