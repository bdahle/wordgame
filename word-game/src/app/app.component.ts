import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private elementRef: ElementRef) { }


  title = 'word-game'

  word = ['h', 'u', 's']

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event)

    for (const [i, char] of this.word.entries()) {
      if (char == event.key) {
        this.word.splice(i, 1)
      }
    }
    console.log(this.word)

    if (this.word.length == 0) {
      console.log("Du vant!")
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'green'
    }
  }



}
