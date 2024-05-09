import { FormsModule } from '@angular/forms';
import {
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  Component,
  OnInit,
} from '@angular/core';
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
import { ThisReceiver } from '@angular/compiler';

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
  @ViewChild('audioPlayerc4', { static: false }) audioPlayerc4!: ElementRef;

  playAudio(audio: any) {
    audio.nativeElement.play();
    setTimeout(() => {
      audio.nativeElement.pause();
      audio.nativeElement.currentTime = 0;
    }, 400);
  }

  @ViewChild('audioPlayerd4', { static: false }) audioPlayerd4!: ElementRef;

  @ViewChild('audioPlayere4', { static: false }) audioPlayere4!: ElementRef;

  @ViewChild('audioPlayerf4', { static: false }) audioPlayerf4!: ElementRef;

  @ViewChild('audioPlayerg4', { static: false }) audioPlayerg4!: ElementRef;

  @ViewChild('audioPlayerc5', { static: false }) audioPlayerc5!: ElementRef;

  @ViewChild('audioPlayerd5', { static: false }) audioPlayerd5!: ElementRef;

  @ViewChild('audioPlayere5', { static: false }) audioPlayere5!: ElementRef;

  @ViewChild('audioPlayergflat', { static: false })
  audioPlayergflat!: ElementRef;

  @ViewChild('audioPlayerpop1', { static: false }) audioPlayerpop!: ElementRef;

  public backgroundcolor: any = 'rgb(255, 255, 255)';
  public extraColors :any[] = [];
  playAudiocpop() {
    this.audioPlayerpop.nativeElement.play();
  }

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
    {
      color: 'red',
      size: 10,
      position: { x: 0, y: 0 },
      state: 'bullet',
      speed: 1,
    },
    {
      color: 'blue',
      size: 20,
      position: { x: 0, y: 0 },
      state: 'bullet',
      speed: 10,
    },
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

  averageColor(colors: any[]) {
    //average the rgb values of the user color in rgb values
    let tempColor = colors[0];
    let number = 0;
    for (let i = 0; i < colors.length; i++) {
      let color = colors[i];
      let tempRGB = tempColor.match(/\d+/g);
      let colorRGB = color.match(/\d+/g);
      let newColor = `rgb(${
        parseInt(colorRGB[0]) + parseInt(tempRGB[0]) / 2
      }, ${parseInt(colorRGB[1]) + parseInt(tempRGB[1]) / 2}, ${
        parseInt(colorRGB[2]) + parseInt(tempRGB[2]) / 2
      })`;
      tempColor = newColor;
      number++;
      if (number >= colors.length) {
        return tempColor;
      }
    }
  }

  averageColor2(colors: any[]) {
    //average the rgb values of the user color in rgb values
    let tempR = 0
    let tempG = 0
    let tempB = 0
    let number = 0;
    let newColor=colors[0];
    for (let i = 0; i < colors.length; i++) {
      let color = colors[i];
       let colorRGB = color.match(/\d+/g);
       tempR += parseInt(colorRGB[0])
       tempG += parseInt(colorRGB[1])
       tempB += parseInt(colorRGB[2])
        
      number++;

      if (number >= colors.length) {
           newColor = `rgb(${
             
             Math.floor(tempR / colors.length)
           }, ${
             
             Math.floor(tempG / colors.length)
           }, ${
             
             Math.floor(tempB / colors.length)
           })`;
        return newColor;
      }
    }
    
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
      speed: data.speed,
    });
  }

  //oninit call a function that generates a splash item every ,5 seconds and give it the random color attribute and random size
  ngOnInit() {
    this.getAllPaintings();
    //after the painting is saved, the server will emit a paintingSaved event, which will trigger the getAllPaintings function
    //asignal that will trigger all users to get the updated list of paintings
    this.socket.on('paintingSaved', () => {
      console.log('paintingSaved');
      this.getAllPaintings();
    });
    this.socket.on('updateUsers', (data: any) => {
      console.log('updateUsers', data);
      this.userInformation = data;
      let colors = [];
      for (let i = 0; i < this.userInformation.length; i++) {
        colors.push(this.userInformation[i].color);
      }
      if (this.backgroundcolor !== "rgb(255, 255, 255)"){
        colors.push(this.backgroundcolor);
      }
      this.backgroundcolor = this.averageColor2(colors);
    });
    //update the list of users to be able to trigger their own piano
    this.socket.on('gameStart', (data: any) => {
      // console.log('data-users', data);
      this.userInformation = data;
      //avverage the colors
      //get the array of colors
      let colors = [];
      for (let i = 0; i < this.userInformation.length; i++) {
        colors.push(this.userInformation[i].color);
      }
         if (this.backgroundcolor !== 'rgb(255, 255, 255)') {
           colors.push(this.backgroundcolor);
         }
      this.backgroundcolor = this.averageColor2(colors);
      // let tempColor = this.userInformation[0].color;
      // //average the rgb values of the user color in rgb values
      // for (let i = 0; i < this.userInformation.length; i++) {
      //   let user = this.userInformation[i];
      //   let color = user.color;
      //   let colorRGB = color.match(/\d+/g);
      //   let newColor = `rgb(${parseInt(colorRGB[0]) / 2}, ${
      //     parseInt(colorRGB[1]) / 2
      //   }, ${parseInt(colorRGB[2]) / 2})`;
      //   this.userInformation[i].color = newColor;
      // }
    });
    //this takes the key presses from the server to trigget the html
    this.socket.on('changeHtml', (data: any) => {
      // Trigger a change in the html based on the data received from the server
      console.log('Received data:', data);
      this.pressKey(data.key, data.name);
    });
    //this generates the splashes for all users
    this.socket.on('generateSplash', (data: any) => {
      console.log(data);
      this.generateSplash(data);
    });

    //this makes the splashes move
    setInterval(() => {
      for (let i = 0; i < this.splashes.length; i++) {
        this.moveDivs(
          this.splashes[i].position.x + 50 * this.splashes[i].speed,
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
        this.playAudio(this.audioPlayerc4);
        selectedKey = selectedPiano.getElementsByClassName('key')[0];
        break;
      case 's':
        this.playAudio(this.audioPlayerd4);
        selectedKey = selectedPiano.getElementsByClassName('key')[1];
        break;
      case 'd':
        this.playAudio(this.audioPlayere4);
        // console.log('key d');
        selectedKey = selectedPiano.getElementsByClassName('key')[2];
        break;
      case 'f':
        this.playAudio(this.audioPlayerf4);
        selectedKey = selectedPiano.getElementsByClassName('key')[3];
        break;
      case 'g':
        this.playAudio(this.audioPlayerg4);
        selectedKey = selectedPiano.getElementsByClassName('key')[4];
        break;
      case 'h':
        this.playAudio(this.audioPlayerc5);
        selectedKey = selectedPiano.getElementsByClassName('key')[5];
        break;
      case 'j':
        this.playAudio(this.audioPlayerd5);
        selectedKey = selectedPiano.getElementsByClassName('key')[6];
        break;
      case 'k':
        this.playAudio(this.audioPlayere5);
        selectedKey = selectedPiano.getElementsByClassName('key')[7];
        break;
      case 'l':
        this.playAudio(this.audioPlayergflat);
        selectedKey = selectedPiano.getElementsByClassName('key')[8];
        break;
      default:
        this.playAudio(this.audioPlayerc4);
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
          this.playAudiocpop();
          for (let h = 0; h < 5; h++) {
            //create a object with the attrbutes, color, size, border radius, top and left values
            let fingercolor = window.getComputedStyle(
              finger[i]
            ).backgroundColor;

            let colors = [];
            for (let i = 0; i < this.userInformation.length; i++) {
              colors.push(this.userInformation[i].color);
            }
            colors.push(fingercolor);
               if (this.backgroundcolor !== 'rgb(255, 255, 255)') {
                 colors.push(this.backgroundcolor);
               }
            this.backgroundcolor=this.averageColor2(colors);
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
    console.log("get paintings");
    this.http.get<any>('/api/paintings').subscribe({
      next: (paintings) => {
        console.log('paintings', paintings);
        let tempPaintings = paintings;
        this.paintings = tempPaintings;
      },
    });
  }

  public savePainting() {
    if(this.splatBits.length>10){
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
    this.paintings.push(newPainting);
    console.log('newpainting', newPainting);

    this.http.post('/api/storePainting', newPainting).subscribe({
      next: (data) => {
        console.log('storedpainting', data);
        this.socket.emit('savePainting');
      },
    });

    //convert the canvas to a data url
  }
  else{
    alert('Please create a painting with more than 10 splats before saving')
  
  }
}

  public selectedNumber: any;

  public deployPainting() {
    let number = this.selectedNumber;
    console.log('number', number);
    console.log('deploypaintings');
    // let selectedPaintingObject = this.paintings[number];
    let selectedPaintingObjectArray = this.paintings.filter((painting) => {
      return painting.id == number;
    });
    console.log('selectedPaintingObjectArray', selectedPaintingObjectArray);
    let selectedPaintingObject: any = selectedPaintingObjectArray[0];

    console.log('selectedPaintingObject', selectedPaintingObject);
    let selectedPainting = selectedPaintingObject.string;
    selectedPainting = JSON.parse(selectedPainting);
    this.splatBits = [];
    //for each of the selected painting settimeout for .3seconds and push it ito the splatbits array
    for (let i = 0; i < selectedPainting.length; i++) {
      setTimeout(() => {
        this.splatBits.push(selectedPainting[i]);
      }, i * 10);
    }
  }
}

//on button click save the contents of the pianodiv into a image filw with html2canvas
