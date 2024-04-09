import { Component } from '@angular/core';

//import greesock from 'greesock';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
//import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { gsap } from 'gsap'

@Component({
  selector: 'app-gameroom',
  standalone: true,
  imports: [],
  templateUrl: './gameroom.component.html',
  styleUrl: './gameroom.component.css'
})
export class GameroomComponent {
//create a an array that holds divs, their color, size and position
   splashes: any[] = [
    {color: 'red', size: 10, position:{x: 0, y: 0}, state: "bullet"},
    {color: 'blue', size: 20, position:{x: 0, y: 0}, state: "bullet"},];
  //create a function that will move the divs in the array
  moveDivs(positionX: number, positionY: number, index: number) {

gsap.to(this.splashes[index].position, { duration: 1, x:positionX }) 
gsap.to(this.splashes[index].position, { duration: 1, y:positionY })   //loop through the array
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
  let random = Math.floor(Math.random() * 100+20);
  let randomHeight = Math.floor(Math.random() * 80 + 20);

  //push a new splash item to the array
  this.splashes.push({color: this.randomColor(), size: random, position:{x: 0, y: 0}, state: "bullet"});
}


}