import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentWord: string = '';
  userInput: string = '';
  isGameActive: boolean = false;
  timeLeft: number = 10;
  score: number = 0;

  wordList: string[] = ['angular', 'typescript', 'component', 'template', 'binding', 'module', 'service'];

  startGame() {
    this.resetGame();
    this.isGameActive = true;
    this.generateWord();
    this.startTimer();
  }

  onInput() {
    if (this.userInput.trim().toLowerCase() === this.currentWord.toLowerCase()) {
      this.score++;
      this.userInput = '';
      this.generateWord();
    }
  }

  generateWord() {
    const randomIndex = Math.floor(Math.random() * this.wordList.length);
    this.currentWord = this.wordList[randomIndex];
  }

  startTimer() {
    const timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft === 0) {
        clearInterval(timer);
        this.isGameActive = false;
        this.currentWord = 'Game Over!';
      }
    }, 1000);
  }

  resetGame() {
    this.score = 0;
    this.timeLeft = 10;
    this.userInput = '';
    this.currentWord = '';
  }
}
