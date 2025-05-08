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
  timeLeft: number = 120;
  score: number = 0;
  countdownValue: number = 3;
  isCountingDown: boolean = false;
  difficulty: string = 'medium';

  wordBank: { [key: string]: string[] } = {
    easy: [
      'cat', 'dog', 'run', 'sun', 'bat', 'hat', 'bug', 'fan', 'map', 'cup',
      'box', 'man', 'red', 'pen', 'cow', 'toy', 'jam', 'bed', 'bus', 'sky'
    ],
    medium: [
      'angular', 'binding', 'module', 'service', 'template', 'button',
      'output', 'observe', 'project', 'command', 'routing', 'website',
      'coding', 'browser', 'feature', 'component', 'upgrade', 'keyboard'
    ],
    hard: [
      'asynchronous', 'declaration', 'configuration', 'observables',
      'typescript', 'implementation', 'architecture', 'encapsulation',
      'inheritance', 'constructor', 'authentication', 'optimization',
      'multithreading', 'dependency', 'synchronization', 'modularity',
      'responsiveness', 'accessibility'
    ]
  };

  get wordList(): string[] {
    return this.wordBank[this.difficulty];
  }

  startGame() {
    this.resetGame();
    this.isCountingDown = true;
    this.countdownValue = 3;
    this.timeLeft = this.difficulty === 'easy' ? 120 : this.difficulty === 'medium' ? 75 : 50;

    const countdownInterval = setInterval(() => {
      this.countdownValue--;

      if (this.countdownValue === 0) {
        clearInterval(countdownInterval);
        this.isCountingDown = false;
        this.isGameActive = true;
        this.generateWord();
        this.startTimer();
      }
    }, 1000);
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
