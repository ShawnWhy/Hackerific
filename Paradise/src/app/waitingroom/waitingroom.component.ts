import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgClass, NgIf } from '@angular/common';
import { HomeService } from '../home.service';
import { FormsModule } from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-waitingroom',
  standalone: true,
  imports: [
    FormsModule,
    // Router, 
    RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './waitingroom.component.html',
  styleUrl: './waitingroom.component.css',
})


export class WaitingroomComponent {
  //initialize router
  public newUsername: string = '';
  public newColor: string = '';
  public rgbcolor: string = '';
  socket: any;
  constructor(private router: Router, private homeSV: HomeService) {
    this.socket = io('http://localhost:8081');
  }

 hexToRgb(hex:string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result){
    let rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
    console.log(rgb);
      return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

  }
  else{
    return null
  }
}
// hexToRgb(hex:string) {
//     var bigint = parseInt(hex, 16);
//     var r = (bigint >> 16) & 255;
//     var g = (bigint >> 8) & 255;
//     var b = bigint & 255;

//     return "rgb(" + r + "," + g + "," + b + ")";
// }

  joinGame() {
    // this.socket.emit("tester")
    console.log(this.newColor)
    console.log(this.newUsername)
    let rgbcolor = this.hexToRgb(this.newColor) 
    if(this.newColor && this.newUsername){
    if (this.newUsername === '' || this.newColor === '' ) {
      alert('Please enter a username and color');
      return;
    }
    else if (this.newUsername.length > 15) {
      alert('Username must be less than 15 characters');
      return;
    }
    //if color is not a rgb value
    //if color is not a rgb(0-255,0-255,0-255) value
    else if (
      rgbcolor && !rgbcolor.toString().match(
        /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/
      )
    ) {
      alert('Color must be a valid hex value');
      return;
    } else if(rgbcolor){
      this.rgbcolor = rgbcolor.toString();

      console.log('joining game');
      //open socket
      this.socket.emit('joinGame', {
        username: this.newUsername,
        color: rgbcolor.toString(),
      });
    }
    this.socket.on('error', (data: any) => {
      console.log(data);
    });
    this.socket.on('gameJoined',() => {
        //send the username and color to the homeservice to store
      this.homeSV.setCurrentUser({
        username: this.newUsername,
        color: this.rgbcolor,
      });
      this.router.navigate(['/gameroom'], {
        
      });
    });
  }
}
}

//write a function that when triggered, opens socker to emit the username and color. if the username already exists in the server, send a error message, if not, navigate to gameroom
