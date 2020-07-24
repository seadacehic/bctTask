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

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
   // this.letters = this.generateRandomLetters();
    this.generateRandomLetters();
    this.words = [];
    this.word = "";
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
}
