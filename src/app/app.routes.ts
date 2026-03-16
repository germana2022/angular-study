import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { TopicDetailComponent } from './features/topics/topic-detail/topic-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'topic/:slug',
        component: TopicDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
