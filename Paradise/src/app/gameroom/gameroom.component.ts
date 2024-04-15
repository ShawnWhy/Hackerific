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
    //get height of the screen
    var screenHeight = window.innerHeight;
    //create a function that generates a random number
    let random = Math.floor(Math.random() * 100 + 20);
    let randomHeight = Math.floor(Math.random() * screenHeight) + 20;

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
      this.generateSplash();
    }, 1500);
    //on every 1 second call a function that moves the divs in the array left 10px
    setInterval(() => {

      for (let i = 0; i < this.splashes.length; i++) {
        this.moveDivs(
          this.splashes[i].position.x + 50,
          this.splashes[i].position.y,
          i
        );
      }
      //remove the item if its left value is greater than the screen's
      for (let i = 0; i < this.splashes.length; i++) {
        //get the width of the screen
        var screenWidth = window.innerWidth;
        if (this.splashes[i].position.x > screenWidth) {
          this.splashes.splice(i, 1);
        }
      }
    }, 10);
  }
  createSplatChild(){

  }

  createSplat(key: any) {
    console.log(key);
    //for each of the divs with finger class get the x location and height
    var selectedKey;
    switch (key) {
      
      case 'a':
        console.log("key a")
         selectedKey = document.getElementsByClassName('key')[0];
        break;
      case 's':
         selectedKey = document.getElementsByClassName('key')[1];
        break;
      case 'd':
        console.log("key d")
         selectedKey = document.getElementsByClassName('key')[2];
        break;
      case 'f':
         selectedKey = document.getElementsByClassName('key')[3];
        break;
      case 'g':
         selectedKey = document.getElementsByClassName('key')[4];
        break;
      case 'h':
         selectedKey = document.getElementsByClassName('key')[5];
        break;
      case 'j':
         selectedKey = document.getElementsByClassName('key')[6];
        break;
      case 'k':
         selectedKey = document.getElementsByClassName('key')[7];
        break;
      case 'l':
         selectedKey = document.getElementsByClassName('key')[8];
        break;
      default:
        selectedKey = document.getElementsByClassName('key')[0];
  
    }
    console.log(selectedKey);
    // selectedKey.style.backgroundColor = 'yellow';
    var finger = selectedKey.getElementsByClassName('finger');

    // for (let i = 0; i < finger.length; i++) {
    //   //set finger element background t0 yellow
    //   finger[i].style.backgroundColor = 'yellow';
    
    // }
    // console.log(finger);
    for (let i = 0; i < finger.length; i++) {
      var x1 = finger[i].getBoundingClientRect().left;
      var x2 = x1+finger[i].getBoundingClientRect().width
      var y = finger[i].getBoundingClientRect().height;
      console.log(x1, x2, y);
      for(let j = 0; j < this.splashes.length; j++) {
        let positionx = this.splashes[j].position.x;
        let positiony = this.splashes[j].position.y;
        let size = this.splashes[j].size;
      //create a new div with the class splat
//if the bounding box of the finger div intersects with the bounding box of the splash div create a new div with the class splat
       if(  (positionx+size>=x1 && positionx<=x2 && y>36) 
        // && (positiony+size >=y && positiony <= y) 
      ) {


        for(let h=0;h<5;h++){
          
        
        //create a object with the attrbutes, color, size, border radius, top and left values
            let fingercolor = window.getComputedStyle(
              finger[i]
            ).backgroundColor;
            let splashcolor = this.splashes[j].color;
            // get the individual rgb values from both the finger and splash div
            let fingerRGB = fingercolor.match(/\d+/g);
            let splashRGB = splashcolor.match(/\d+/g);
        let newColor;
        if (fingerRGB && splashRGB) {
          newColor = `rgb(${
            (parseInt(fingerRGB[0]) + parseInt(splashRGB[0])) / 2
          }, ${(parseInt(fingerRGB[1]) + parseInt(splashRGB[1])) / 2}, ${
            (parseInt(fingerRGB[2]) + parseInt(splashRGB[2])) / 2
          })`;
          
          var splat = {
            color: newColor,
            size: Math.random() * parseFloat(this.splashes[j].size) + 2,
            borderRadius: Math.random() * 50 + "%",
            top: positiony,
            left: positionx,
            animation: Math.floor(Math.random() * 19) +1,
          };

          this.splatBits.push(splat);
        }
      }

      this.splashes.splice(j, 1);

    }
  }
    

  }
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
        'rgb(255, 40, 30)',
      ],
    }
      ];

  //create a array of splatbits, each containing rgbcolor, size, borderradius, top and left values
  splatBits: any[] = [
  ];

  //register keypress
  onKeydown(event:any) {
    setTimeout(() => {
      this.createSplat(event.key);
    }, 20);
    setTimeout(() => {
      this.createSplat(event.key);
    }, 120);
    setTimeout(() => {
      this.createSplat(event.key);
    }, 220);  
    

 console.log(event.key);
switch(event.key) {
  //the list of keys are asdfghjkl
  case 'a':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[0] = true;
    setTimeout(() => {
    this.userInformation[0].buttonStates[0] = false;

    }, 500);
    break;
  
  case 's':

    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[1] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[1] = false;
        }, 500);
    break;
  case 'd':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[2] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[2] = false;
        }, 500);
    break;
  case 'f':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[3] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[3] = false;
        }, 500);
    break;
  case 'g':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[4] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[4] = false;
        }, 500);
    break;
  case 'h':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[5] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[5] = false;
        }, 500);
    break;
  case 'j':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[6] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[6] = false;
        }, 500);
    break;
  case 'k':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[7] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[7] = false;
        }, 500);
    break;
  case 'l':
    //if the key is pressed change the button state to true
    this.userInformation[0].buttonStates[8] = true;
        setTimeout(() => {
          this.userInformation[0].buttonStates[8] = false;
        }, 500);
    break;

}

}



}

//on button click save the contents of the pianodiv into a image filw with html2canvas
function saveImage() {
  //get the piano div
  var piano = document.getElementById('piano');
  //use html2canvas to save the contents of the piano div to an image file
  html2canvas(piano).then(function (canvas) {
    var a = document.createElement('a');
    //convert the canvas to a data url
    var image = canvas.toDataURL('image/png');
    //set the href of the anchor tag to the data url
    a.href = image;
    //set the download attribute of the anchor tag to the image
    a.download = 'image.png';
    //click the anchor tag
    a.click();
  });
}