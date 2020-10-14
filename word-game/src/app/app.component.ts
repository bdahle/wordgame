//insert spaces med pipes?
//TODO flash groent naar trykker paa en bokstav man allerede har? og naar gjetter riktig, og roedt naar feil
//gjoer hele ordet groent naar har vunnet?
//TODO nytt ord knapp?
//TODO sentrer vertikalt

import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private elementRef: ElementRef) { }
  title = 'word-game'

  word: String = "methylamine"
  guessedWord: String = ""
  remainingWord: String = ""
  triedWrongLetters: String = ""
  tryCounter: number = 0;

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
      console.log("Du vant!")
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'green'
    } else if (this.tryCounter >= 5) {
      console.log("Du tapte")
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'red'
    }
  }

  setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let key = event.key.toLowerCase()
    if (/[a-z]/.test(key)) {
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
