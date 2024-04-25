import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  catchError,
  throwError,
  concatMap,
} from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private chosenItemState: BehaviorSubject<string> =
    new BehaviorSubject<string>('off');
  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>({
    username: 'Guest',
    points: 20,
    id: 0,
  });

  


  private Favs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private TopComments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private randomNumber: BehaviorSubject<number> = new BehaviorSubject<number>(
    3
  );


  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: any) {
    this.currentUser.next(user);
  }

  
  
}
