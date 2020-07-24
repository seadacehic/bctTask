import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public letters: object[];
  public words: string[];
  public word: string;
  public result: number;
  public http: HttpClient;
  public baseUrl: string;
  public counter: any;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.generateRandomLetters();
    this.initilizeCounter();
    this.words = [];
    this.word = "";
    this.http = http;
    this.baseUrl = baseUrl;
    this.counter = null;
  }
  public addLetter(value, id) {
    console.log('letter: ', value);
    this.word += value;
    console.log('letter: ', this.word);

    this.letters.forEach(function (item) {
      if (item.id === id) {
        item.selected = true;
      }
    })

  
  }

  public generateRandomLetters() {
    let randomLetters = [];
    for (let i = 0; i < 16; i++) {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const letter = {
        id: i,
        value: randomLetter,
        selected: false
      };
      randomLetters.push(letter);
    }

    this.letters = randomLetters;
  }

  public clearState() {
    if (this.letters.length > 0) {
      this.letters.forEach(function (item) {
        item.selected = false;
      });
    }

    this.word = '';
    this.words = [];
    this.result = -1;
    this.initilizeCounter();
    this.generateRandomLetters();
  }

  public saveWord() {
    if (this.word.length > 2) {
      console.log('letter: ', this.word);
      this.words.push(this.word);

      this.letters.forEach(function (item) {
        item.selected = false;
      });

      this.word = '';
    }
  }

  public clearWord() {
    if (this.letters.length > 0) {
      this.letters.forEach(function (item) {
        item.selected = false;
      });
    }

    this.word = '';
  }

  public finishGame() {
      this.http.post<number>(this.baseUrl + 'api/Boggle/CalculateBoggleResult', this.words).subscribe(result => {
        this.result = result;
      }, error => console.error(error));
  }


  //counter logic copied from https://www.w3schools.com/howto/howto_js_countdown.asp
  public initilizeCounter() {
    // Set the date we're counting down to
    var countDownDate = new Date(Date.now() + 3000 * 60);
    var me = this;
    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("timer").innerHTML = "Time left: " + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        me.finishGame();
        document.getElementById("timer").innerHTML = "Time expired!";
      }
    }, 1000);

  }
}
