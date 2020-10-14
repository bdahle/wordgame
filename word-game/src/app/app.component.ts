//TODO ignorere taster som ikke er bokstaver
//TODO virker med store bokstaver
//TODO autogenerer initial guessedWord
//TODO logg hvilke bokstaver som er forsoekt, skal ikke faa feil for aa gjette det samme mange ganger

import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private elementRef: ElementRef) { }
  title = 'word-game'

  word = "solnedgangen"
  guessedWord = "  l   g  g  "
  remainingWord = ""
  tryCounter = 0;

  ngOnInit(): void {
    this.setRemainingWord()
    this.logWords()
  }

  logWords() {
    console.log("WORD", this.word)
    console.log("GUESSED '" + this.guessedWord + "'")
    console.log("REMAIN", this.remainingWord)
  }

  setRemainingWord() {
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

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event)
    this.tryCounter++


    for (let i = 0; i < this.remainingWord.length; i++) {
      if (this.remainingWord[i] == event.key) {
        this.guessedWord = this.setCharAt(this.guessedWord, i, this.remainingWord[i])
        this.remainingWord = this.setCharAt(this.remainingWord, i, " ")
        this.tryCounter--

      } else if (this.guessedWord[i] == event.key) {
        this.tryCounter--

      }
    }


    this.logWords()
    this.hasWonOrLost()
  }


}
