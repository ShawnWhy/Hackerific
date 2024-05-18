export class Audioservice {


    constructor() {}

 public calculateFrequency:any = function(array:any[], sampleRate:any) {
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


public C_MAJOR_SCALE:any[] = ["C", "D", "E", "F", "G", "A", "B"];
public  FREQUENCIES:any = {
                C: 261.63,
                D: 293.66,
                E: 329.63,
                F: 349.23,
                G: 392.0,
                A: 440.0,
                B: 493.88,
};

public checkMicrophoneStatus= function(this: Audioservice, analyser:any, audioContext:any, pianokeyFunction:any) {
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      const array = new Uint8Array(analyser.frequencyBinCount);
    let differenceHash: { [key: number]: string } = {};
    for (let note in this.FREQUENCIES) {
        differenceHash[Math.abs(currentFrequency - this.FREQUENCIES[note])] = note;
    }
      for (let i = 0; i < bufferLength; i++) {
        sum += Math.abs(dataArray[i] - 128);
      }

      const average = sum / bufferLength;

      // Choose a threshold level to define silence or activity
      const threshold = 5;

      // Trigger actions based on the microphone status
      if (average >= threshold) {
        console.log("sound");

        switch (differenceHash[smallestDiff]) {
          case "C":
            pianokeyFunction(200);
            break;
          case "D":
            pianokeyFunction(250);
            break;
          case "E":
            pianokeyFunction(300);
            break;
          case "F":
            pianokeyFunction(350);
            break;
          case "G":
            pianokeyFunction(400);
            break;
          case "A":
            pianokeyFunction(450);
            break;
          case "B":
            pianokeyFunction(500);
            break;
        }
        // You can perform additional actions here
      } else {
        console.log("The microphone is not actively receiving information.");
        // You can handle the inactive state here
      }

      // Continue checking the microphone status
      requestAnimationFrame(this.checkMicrophoneStatus());
    }



  playByVoice = function(stream:any) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    // Create an AnalyserNode to analyze the audio data
    const analyser = audioContext.createAnalyser();
    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    //use updated code for javascriptNode
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

this.checjMicrophoneStatus()

 }

//     // Check the microphone status continuously


    // Start checking the microphone status

    // Let my firm guidance remind you, my devoted one,
    // stay attentive and remember that even the silence can reveal much about one's desires.

//use async in angular


  async function getAudioStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // You now have access to the audio stream
      alert('You have access to the audio stream');
    } catch (error) {
      console.error('Error accessing audio stream:', error);
    }
  }


}
