import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, OnChanges, Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgClass, NgIf } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { gsap } from 'gsap'

@Component({
  selector: 'app-gameroom',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    NgIf,
    NgClass,
    NgFor,
  ],
  templateUrl: './gameroom.component.html',
  styleUrl: './gameroom.component.css',
})
export class GameroomComponent {
  //create a an array that holds divs, their color, size and position
  splashes: any[] = [
    { color: 'red', size: 10, position: { x: 0, y: 0 }, state: 'bullet' },
    { color: 'blue', size: 20, position: { x: 0, y: 0 }, state: 'bullet' },
  ];
  //create a function that will move the divs in the array
  moveDivs(positionX: number, positionY: number, index: number) {
    gsap.to(this.splashes[index].position, { duration: 1, x: positionX });
    gsap.to(this.splashes[index].position, { duration: 1, y: positionY }); //loop through the array
    //loop through the array
  }
  //create a function that will reset the position of the divs
  resetDivs() {
    //loop through the array
    for (let i = 0; i < this.splashes.length; i++) {
      //reset the position of each div to 0
      this.splashes[i].position = 0;
    }
  }

  //create a functions that generated a random color every 5 seconds colors are based on rgb values
  public randomColor() {
    //create a function that generates a random number
    let random = Math.floor(Math.random() * 255);
    let random2 = Math.floor(Math.random() * 255);
    let random3 = Math.floor(Math.random() * 255);
    //return a random color
    return `rgb(${random}, ${random2}, ${random3})`;
  }

  //create a function that generates a splash item every ,5 seconds and give it the random color attribute and random size
  public generateSplash() {
    //create a function that generates a random number
    let random = Math.floor(Math.random() * 100 + 20);
    let randomHeight = Math.floor(Math.random() * 80 + 20);

    //push a new splash item to the array
    this.splashes.push({
      color: this.randomColor(),
      size: random,
      position: { x: -150, y: randomHeight },
      state: 'bullet',
    });
  }

  //oninit call a function that generates a splash item every ,5 seconds and give it the random color attribute and random size
  ngOnInit() {
    setInterval(() => {
      // this.generateSplash();
    }, 1500);
    //on every 1 second call a function that moves the divs in the array left 10px
    setInterval(() => {
      // for (let i = 0; i < this.splashes.length; i++) {
      //   this.moveDivs(
      //     this.splashes[i].position.x + 10,
      //     this.splashes[i].position.y,
      //     i
      //   );
      // }
      //remove the item if its left value is greater than the screen's
    }, 10);
  }

  //create a list of userinformation that has name, a list of nine button states, which include pressed(a boolean), and user color
  userInformation: any[] = [
    {
      name: 'Player 1',
      buttonStates: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],

      //color is in rgb values
      color: 'rgb(255, 0, 0)',
      fingerColors: [
        //27 colors in the array each color is in rgb values, each is a different color which is a variation of rgb(255, 0, 0) with each value differing from 5 to 40
        'rgb(255, 0, 0)',
        'rgb(255, 5, 5)',
        'rgb(255, 10, 10)',
        'rgb(255, 15, 15)',
        'rgb(250, 20, 20)',
        'rgb(250, 25, 25)',
        'rgb(253, 30, 10)',
        'rgb(255, 35, 35)',
        'rgb(255, 40, 30)',
        'rgb(255, 45, 35)',
        'rgb(255, 50, 40)',
        'rgb(255, 55, 45)',
        'rgb(255, 60, 50)',
        'rgb(255, 65, 55)',
        'rgb(255, 70, 60)',
        'rgb(255, 75, 65)',
        'rgb(255, 80, 70)',
        'rgb(255, 85, 75)',
        'rgb(255, 90, 80)',
        'rgb(255, 80, 70)',
        'rgb(255, 85, 75)',
        'rgb(255, 95, 85)',
        'rgb(250, 20, 20)',
        'rgb(250, 25, 25)',
        'rgb(253, 30, 10)',
        'rgb(255, 35, 35)',
        'rgb(255, 40, 30)'
      ],
    },

        {
      name: 'Player 2',
      buttonStates: [
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
      ],

      //color is in rgb values
      color: 'rgb(255, 0, 0)',
      fingerColors: [
        //27 colors in the array each color is in rgb values, each is a different color which is a variation of rgb(255, 0, 0) with each value differing from 5 to 40
        'rgb(25, 0, 0)',
        'rgb(25, 5, 5)',
        'rgb(255, 10, 10)',
        'rgb(255, 15, 15)',
        'rgb(250, 20, 20)',
        'rgb(20, 25, 25)',
        'rgb(253, 30, 10)',
        'rgb(55, 35, 35)',
        'rgb(255, 40, 30)',
        'rgb(25, 45, 35)',
        'rgb(255, 50, 40)',
        'rgb(255, 55, 45)',
        'rgb(255, 60, 50)',
        'rgb(255, 65, 55)',
        'rgb(255, 70, 60)',
        'rgb(25, 75, 65)',
        'rgb(255, 80, 70)',
        'rgb(255, 85, 75)',
        'rgb(255, 90, 80)',
        'rgb(255, 80, 70)',
        'rgb(25, 85, 75)',
        'rgb(255, 95, 85)',
        'rgb(250, 20, 20)',
        'rgb(20, 25, 25)',
        'rgb(253, 30, 10)',
        'rgb(55, 35, 35)',
        'rgb(255, 40, 30)'
      ],
    }
  ];
  
}