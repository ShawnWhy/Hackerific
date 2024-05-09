import { Routes } from '@angular/router';
import { GameroomComponent } from './gameroom/gameroom.component';
import { WaitingroomComponent } from './waitingroom/waitingroom.component';

export const routes: Routes = [
  // {path:'weather/:filter', component:WeatherPageComponent, title:"Weather is nice today isn't it?"},
  { path: 'gameroom', component: GameroomComponent },
  { path: 'waitingroom', component: WaitingroomComponent },
  
  { path: '', redirectTo: '/waitingroom', pathMatch: 'full' },
];