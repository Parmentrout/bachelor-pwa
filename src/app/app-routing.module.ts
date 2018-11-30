import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContestantsComponent } from './pages/contestants/contestants.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'contestants',
    component: ContestantsComponent
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
