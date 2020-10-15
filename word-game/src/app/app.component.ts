//insert spaces med pipes?
//TODO flash groent naar trykker paa en bokstav man allerede har? og naar gjetter riktig, og roedt naar feil
//gjoer hele ordet groent naar har vunnet?
//TODO nytt ord knapp?
//TODO sentrer vertikalt
//TODO flere ord, eventuelt hente eksternt
//TODO stop from typing when has won
//TODO bokstavne du mangler kommer opp i roedt?

import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private elementRef: ElementRef) { }
  title = 'word-game'

  // wordList = ['ground',
  //   'introduce',
  //   'junior',
  //   'ignorance',
  //   'psychology',
  //   'coffin',
  //   'grass',
  //   'embark',
  //   'ostracize',
  //   'concede'];
  words = "apology harsh chimpanzee peace prospect of colon game law lineage matter important truck letter domestic annual bulletin gradient morale extent discriminate chip stitch frequency uncle qualification productive herd unity pleasant forecast object interference flex physical relief mainstream critical message incongruous drag bishop credibility stadium belief pocket conceive boy hunter talented"
  wordList = this.words.split(/\s+/)
  word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
  // word: String = "methylamine"
  guessedWord: String = ""
  remainingWord: String = ""
  triedWrongLetters: String = ""
  tryCounter: number = 0;
  hasGuessedWord: boolean = false

  ngOnInit(): void {
    this.setInitialGuessedWord()
    this.setInitialRemainingWord()
    this.logWords()
  }

  logWords() {
    console.log("WORD", this.word)
    console.log("GUESSED '" + this.guessedWord + "'")
    console.log("REMAIN", this.remainingWord)
  }

  setInitialGuessedWord() {
    let firstChar = this.word[0]
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] == firstChar) {
        this.guessedWord = this.guessedWord.concat(firstChar)
      } else {
        this.guessedWord = this.guessedWord.concat(" ")
      }
    }
  }

  setInitialRemainingWord() {
    for (let i = 0; i < this.word.length; i++) {
      if (this.guessedWord[i] == this.word[i]) {
        this.remainingWord = this.remainingWord.concat(" ")
      } else {
        this.remainingWord = this.remainingWord.concat(this.word[i])
      }
    }
  }

  hasWonOrLost() {
    if (this.guessedWord == this.word) {
      this.hasGuessedWord = true
      console.log("Du vant!")
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#5FAD41"
    } else if (this.tryCounter >= 5) {
      console.log("Du tapte")
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#D00000"
    }
  }

  setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let key = event.key.toLowerCase()
    if (!this.hasGuessedWord && /[a-z]/.test(key)) {
      let newAndWrongGuess: boolean = true;

      for (let i = 0; i < this.word.length; i++) { //endre til word?
        //Correct guess?
        if (key == this.remainingWord[i]) {

          this.guessedWord = this.setCharAt(this.guessedWord, i, this.remainingWord[i])
          this.remainingWord = this.setCharAt(this.remainingWord, i, " ")
          newAndWrongGuess = false
        }
        //Already guessed?
        else if (key == this.guessedWord[i]) {

          newAndWrongGuess = false
        }
      }

      //Already tried this letter?
      for (let i = 0; i < this.triedWrongLetters.length; i++) {
        if (key == this.triedWrongLetters[i]) {
          newAndWrongGuess = false
        }
      }

      if (newAndWrongGuess) {
        this.triedWrongLetters = this.triedWrongLetters.concat(key)
        this.tryCounter++
      }

      this.logWords()
      this.hasWonOrLost()
    }
  }
}
