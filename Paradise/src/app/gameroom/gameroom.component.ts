import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, OnChanges, Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgClass, NgIf } from '@angular/common';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { gsap } from 'gsap';
import { io } from 'socket.io-client';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-gameroom',
  standalone: true,
  imports: [
    FormsModule,
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
export class GameroomComponent implements OnInit {
  socket: any;
  // create a user variable that takes from variables passed from the waiting room
  user: any;

  paintings: any[] = [];
  constructor(private homeSV: HomeService, private http: HttpClient) {
    this.socket = io('http://localhost:8081');
    this.homeSV.getCurrentUser().subscribe((user) => {
      console.log(user);
      //  console.log('comminity page');
      this.user = user;
    });
    console.log(this.user);
    if (this.user.color) {
      console.log('this.user', this.user);
      // this.createNewUser(this.user);
      this.socket.emit('gameStart', {
        name: this.user.username,
        color: this.user.color,
      });
    }
  }

  createNewUser(user: any) {
    let newFingerColors = [];
    let newButtonStates = [];
    for (let i = 0; i < 27; i++) {
      newFingerColors.push(this.randomColorBasedOnColor(user.color));
    }

    for (let i = 0; i < 9; i++) {
      newButtonStates.push(false);
    }
    let newUser = {
      name: user.username,
      buttonStates: newButtonStates,
      color: user.color,
      fingerColors: newFingerColors,
    };

    this.userInformation.push(newUser);
  }

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

  public randomColorBasedOnColor(color: any) {
    //turn the color into rgb values
    let colorRGB = color.match(/\d+/g);
    //create a new color based on the color passed in plus or minis 50 if number is negative, number is 0
    let random = Math.floor(Math.random() * 100) - 50;
    let random2 = Math.floor(Math.random() * 100) - 50;
    let random3 = Math.floor(Math.random() * 100) - 50;
    let newRed = parseInt(colorRGB[0]) + random;
    let newGreen = parseInt(colorRGB[1]) + random2;
    let newBlue = parseInt(colorRGB[2]) + random3;
    //check if the new color is within the rgb range
    if (newRed > 255) {
      newRed = 255;
    }
    if (newRed < 0) {
      newRed = 0;
    }
    if (newGreen > 255) {
      newGreen = 255;
    }
    if (newGreen < 0) {
      newGreen = 0;
    }
    if (newBlue > 255) {
      newBlue = 255;
    }
    if (newBlue < 0) {
      newBlue = 0;
    }
    //return a random color
    return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
  }
  //create a function that generates a splash item every ,5 seconds and give it the random color attribute and random size
  public generateSplash(data: any) {
    //get height of the screen
    //create a function that generates a random number
    let screenHeight = window.innerHeight;
    let randomHeight = screenHeight * (parseFloat(data.height) / 100);
    //push a new splash item to the array
    this.splashes.push({
      color: data.color,
      size: data.size,
      position: { x: -150, y: randomHeight },
      state: 'bullet',
    });
  }

  //oninit call a function that generates a splash item every ,5 seconds and give it the random color attribute and random size
  ngOnInit() {
    //after the painting is saved, the server will emit a paintingSaved event, which will trigger the getAllPaintings function
    //asignal that will trigger all users to get the updated list of paintings
    this.socket.on('paintingSaved', () => {
      console.log('paintingSaved');
      this.getAllPaintings();
    });
    //update the list of users to be able to trigger their own piano
    this.socket.on('gameStart', (data: any) => {
      console.log('data-users', data);
      this.userInformation = data;
    });
    //this takes the key presses from the server to trigget the html
    this.socket.on('changeHtml', (data: any) => {
      // Trigger a change in the html based on the data received from the server
      console.log('Received data:', data);
      this.pressKey(data.key, data.name);
    });
    //this generates the splashes for all users
    this.socket.on('generateSplash', (data: any) => {
      // console.log(data);
      this.generateSplash(data);
    });

    //this makes the splashes move
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

  createSplat(key: any, name: any) {
    // console.log(key);
    //for each of the divs with finger class get the x location and height
    var selectedKey;
    //find the index of the user that pressed the key via name attribute
    // find the element that has the id of the name of the user that pressed the key
    var selectedPiano = document.getElementById(name);
    console.log('selectedPiano', selectedPiano);
    if (!selectedPiano) {
      //stop
      console.log('selected piano not found');
      return;
    }

    switch (key) {
      case 'a':
        // console.log('key a');
        selectedKey = selectedPiano.getElementsByClassName('key')[0];
        break;
      case 's':
        selectedKey = selectedPiano.getElementsByClassName('key')[1];
        break;
      case 'd':
        // console.log('key d');
        selectedKey = selectedPiano.getElementsByClassName('key')[2];
        break;
      case 'f':
        selectedKey = selectedPiano.getElementsByClassName('key')[3];
        break;
      case 'g':
        selectedKey = selectedPiano.getElementsByClassName('key')[4];
        break;
      case 'h':
        selectedKey = selectedPiano.getElementsByClassName('key')[5];
        break;
      case 'j':
        selectedKey = selectedPiano.getElementsByClassName('key')[6];
        break;
      case 'k':
        selectedKey = selectedPiano.getElementsByClassName('key')[7];
        break;
      case 'l':
        selectedKey = selectedPiano.getElementsByClassName('key')[8];
        break;
      default:
        selectedKey = selectedPiano.getElementsByClassName('key')[0];
    }
    // console.log(selectedKey);
    // selectedKey.style.backgroundColor = 'yellow';
    var finger = selectedKey.getElementsByClassName('finger');

    // for (let i = 0; i < finger.length; i++) {
    //   //set finger element background t0 yellow
    //   finger[i].style.backgroundColor = 'yellow';

    // }
    // console.log(finger);
    for (let i = 0; i < finger.length; i++) {
      var x1 = finger[i].getBoundingClientRect().left;
      var x2 = x1 + finger[i].getBoundingClientRect().width;
      var y = finger[i].getBoundingClientRect().height;
      // console.log(x1, x2, y);
      for (let j = 0; j < this.splashes.length; j++) {
        let positionx = this.splashes[j].position.x;
        let positiony = this.splashes[j].position.y;
        let size = this.splashes[j].size;
        //create a new div with the class splat
        //if the bounding box of the finger div intersects with the bounding box of the splash div create a new div with the class splat
        if (
          positionx + size >= x1 &&
          positionx <= x2 &&
          y > 36
          // && (positiony+size >=y && positiony <= y)
        ) {
          for (let h = 0; h < 5; h++) {
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
                borderRadius: Math.random() * 50 + '%',
                top: positiony,
                left: positionx,
                animation: Math.floor(Math.random() * 19) + 1,
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
    },
  ];

  //create a array of splatbits, each containing rgbcolor, size, borderradius, top and left values
  splatBits: any[] = [];

  //register keypress
  onKeydown(event: any) {
    this.socket.emit('keyPressed', {
      key: event.key,
      name: this.user.username,
    });
    // this.pressKey(event.key);
  }

  pressKey(key: any, name: any) {
    console.log(this.userInformation);
    console.log('name', name);
    setTimeout(() => {
      this.createSplat(key, name);
    }, 20);
    setTimeout(() => {
      this.createSplat(key, name);
    }, 120);
    setTimeout(() => {
      this.createSplat(key, name);
    }, 220);

    // find user index of user that matches the name of the user that pressed the key
    let userIndex = this.userInformation.findIndex((user) => {
      return user.name === name;
    });

    console.log(userIndex);

    // console.log(event.key);
    switch (key) {
      //the list of keys are asdfghjkl
      case 'a':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[0] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[0] = false;
        }, 500);
        break;

      case 's':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[1] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[1] = false;
        }, 500);
        break;
      case 'd':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[2] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[2] = false;
        }, 500);
        break;
      case 'f':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[3] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[3] = false;
        }, 500);
        break;
      case 'g':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[4] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[4] = false;
        }, 500);
        break;
      case 'h':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[5] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[5] = false;
        }, 500);
        break;
      case 'j':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[6] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[6] = false;
        }, 500);
        break;
      case 'k':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[7] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[7] = false;
        }, 500);
        break;
      case 'l':
        //if the key is pressed change the button state to true
        this.userInformation[userIndex].buttonStates[8] = true;
        setTimeout(() => {
          this.userInformation[userIndex].buttonStates[8] = false;
        }, 500);
        break;
    }
  }

  saveImage() {
    console.log('saveimage');
    //get the piano div
    var piano: any = document.getElementsByClassName('splatCanvass')[0];
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

  public getAllPaintings() {
    this.http.get<any>('/api/paintings').subscribe({
      next: (paintings) => {
        console.log("paintings",paintings);
        let tempPaintings = paintings;
        this.paintings = tempPaintings;
      },
    });
  }



  public savePainting() {
    
    //get the piano div
    let splatbits = this.splatBits;
    let string = JSON.stringify(splatbits);
    let users: string = '';
    for (let i = 0; i < this.userInformation.length; i++) {
      users += this.userInformation[i].name + ' ';
    }
    let date = new Date();
    //turn date into dd/mm/yyyy format
    let dateString =
      date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    //use html2canvas to save the contents of the piano div to an image file
    let newPainting = {
      string: string,
      users: users,
      date: dateString,
    };
    console.log("newpainting",newPainting)

    this.http.post('/api/storePainting', newPainting).subscribe({
      next: (data) => {
        console.log('storedpainting', data);
      },
    });

    this.socket.emit('savePainting');
    //convert the canvas to a data url
  }

  public selectedNumber: any;

  public deployPainting() {
    let number = this.selectedNumber
    console.log('number', number);
    console.log("deploypaintings");
    let selectedPaintingObject = this.paintings[number];
    let selectedPainting = selectedPaintingObject.string;
    selectedPainting = JSON.parse(selectedPainting);
    this.splatBits = [];
    //for each of the selected painting settimeout for .3seconds and push it ito the splatbits array
    for (let i = 0; i < selectedPainting.length; i++) {
      setTimeout(() => {
        this.splatBits.push(selectedPainting[i]);
      }, i * 300);
    }
  }
}

//on button click save the contents of the pianodiv into a image filw with html2canvas
