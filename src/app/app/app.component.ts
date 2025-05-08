import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  initialTime: number = 0;
  currentWord: string = '';
  userInput: string = '';
  isGameActive: boolean = false;
  timeLeft: number = 120;
  score: number = 0;
  countdownValue: number = 3;
  isCountingDown: boolean = false;
  difficulty: string = 'medium';
  highScore: number = 0;
  inputflash: boolean = false;
  bestDifficulty: string = 'medium';
  inputErrorFlash: boolean = false;
  wordPool: string[] = [];

  ngOnInit() {
    const saved = localStorage.getItem('highScore');
    const savedDiff = localStorage.getItem('bestDifficulty');
    this.highScore = saved ? parseInt(saved) : 0;
    this.bestDifficulty = savedDiff || 'medium';
  }

  wordBank: { [key: string]: string[] } = {
    easy: [
      'cat',
      'dog',
      'run',
      'sun',
      'bat',
      'hat',
      'bug',
      'fan',
      'map',
      'cup',
      'box',
      'man',
      'red',
      'pen',
      'cow',
      'toy',
      'jam',
      'bed',
      'bus',
      'sky',
    ],
    medium: [
      'angular',
      'binding',
      'module',
      'service',
      'template',
      'button',
      'output',
      'observe',
      'project',
      'command',
      'routing',
      'website',
      'coding',
      'browser',
      'feature',
      'component',
      'upgrade',
      'keyboard',
    ],
    hard: [
      'asynchronous',
      'declaration',
      'configuration',
      'observables',
      'typescript',
      'implementation',
      'architecture',
      'encapsulation',
      'inheritance',
      'constructor',
      'authentication',
      'optimization',
      'multithreading',
      'dependency',
      'synchronization',
      'modularity',
      'responsiveness',
      'accessibility',
    ],
  };

  get wordList(): string[] {
    return this.wordBank[this.difficulty];
  }

  startGame() {
    this.resetGame();
    this.isCountingDown = true;
    this.countdownValue = 3;
    this.initialTime =
      this.difficulty === 'easy' ? 120 : this.difficulty === 'medium' ? 75 : 50;
    this.wordPool = [...this.wordList];
    this.timeLeft = this.initialTime;

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
    const trimmedInput = this.userInput.trim().toLowerCase();

    if (trimmedInput === this.currentWord.toLowerCase()) {
      this.score++;

      this.inputflash = true;
      setTimeout(() => (this.inputflash = false), 150);

      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('highScore', this.highScore.toString());
        this.bestDifficulty = this.difficulty;
        localStorage.setItem('bestDifficulty', this.bestDifficulty);
      }

      this.userInput = '';
      this.generateWord();
    } else if (
      trimmedInput.endsWith(' ') ||
      trimmedInput.length >= this.currentWord.length + 2
    ) {
      this.inputErrorFlash = true;
      setTimeout(() => (this.inputErrorFlash = false), 150);
    }
  }

  generateWord() {
    if (this.wordPool.length === 0) {
      this.wordPool = [...this.wordList];
    }

    this.currentWord = this.wordPool.shift()!;
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
