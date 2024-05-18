import { Injectable } from '@angular/core';
import { GameroomComponent } from './gameroom/gameroom.component';
@Injectable({
  providedIn: 'root',
})
export class AudioserviceService {
  FREQUENCIES: { [key: string]: number } = {
    C: 261.63,
    D: 293.66,
    E: 329.63,
    F: 349.23,
    G: 392.0,
    A: 440.0,
    B: 493.88,
    C2: 523.25,
    D2: 587.33,
  };

  checkMicrophoneStatus(
    analyser: any,
    audioContext: any,
    pianokeyFunction: any,
    user: any,
    socket:any
   
  ) {
    // console.log('checking microphone status');
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += Math.abs(dataArray[i] - 128);
    }

    const average = sum / bufferLength;

    // Choose a threshold level to define silence or activity
    const threshold = 5;

    // console.log('average:', average);

    // Trigger actions based on the microphone status
    if (average >= threshold) {
      console.log('sound');

      let currentFrequency = this.calculateFrequency(
        dataArray,
        audioContext.sampleRate
      );

      let smallestDiff = Object.keys(this.FREQUENCIES).reduce((a, b) =>
        Math.abs(this.FREQUENCIES[a] - currentFrequency) <
        Math.abs(this.FREQUENCIES[b] - currentFrequency)
          ? a
          : b
      );

      switch (smallestDiff) {
        case 'C':
          pianokeyFunction(
            'a',
            user,
            socket
          

          );
          break;
        case 'D':
          pianokeyFunction(
            's',
            user,
            socket
                  );
          break;
        case 'E':
          pianokeyFunction(
            'd',
            user,
            socket
          
          );
          break;
        case 'F':
          pianokeyFunction(
            'f',
            user,
            socket
           
          );
          break;
        case 'G':
          pianokeyFunction(
            'g',
            user,
            socket
          
          );
          break;
        case 'A':
          pianokeyFunction(
            'h',
            user,
            socket
          
          );
          break;
        case 'B':
          pianokeyFunction(
            'j',
            user,
            socket
          
          );
          break;
        case 'C2':
          pianokeyFunction(
            'k',
            user,
            socket
            
          );
          break;
        case 'D2':
          pianokeyFunction(
            'l',
            user,
            socket
           
          );
          break;
      }
      // You can perform additional actions here
    } else {
      // console.log('The microphone is not actively receiving information.');
      // You can handle the inactive state here
    }

    // Continue checking the microphone status
    requestAnimationFrame(() =>
      this.checkMicrophoneStatus(
        analyser,
        audioContext,
        pianokeyFunction,
        user,
        socket
       
      )
    );
  }

  calculateFrequency(array: Uint8Array, sampleRate: any) {
    let maxIndex = -1;
    let maxAmplitude = -Infinity;

    for (let i = 0; i < array.length; i++) {
      if (array[i] >= maxAmplitude) {
        maxAmplitude = array[i];
        maxIndex = i;
      }
    }

    return maxIndex * (sampleRate / (2 * array.length));
  }

  playByVoice(
    stream: any,
    pianoKeyFunction: any,
    user: any,
    socket:any
    
  ) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    // Create an AnalyserNode to analyze the audio data
    const analyser = audioContext.createAnalyser();
    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    // Use updated code for javascriptNode
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    this.checkMicrophoneStatus(
      analyser,
      audioContext,
      pianoKeyFunction,
      user,
      socket
     
    );
  }

  async getAudioStream(
    pianoKeyFunction: any,
    user: any,
    socket:any,
   
  ) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.playByVoice(
        stream,
        pianoKeyFunction,
        user,
        socket,
        
      );
  
      console.log('You have access to the audio stream');
    } catch (error) {
      // console.error('Error accessing audio stream:', error);
    }
  }

  constructor() {}
}
