import { Component } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-maths',
  templateUrl: './maths.component.html',
  styleUrls: ['./maths.component.scss']
})
export class MathsComponent{
  questionCount: number = 0;
  correctAnswers: number = 0;
  score: number = 0;
  timerWidth: number = 100;
  timerMaxWidth: number = 180;
  timerInterval: any;

  mathScore: boolean = false;
  mathResult: any = {};

  constructor(
    private userService: UserService,
    private router: Router

  ) {}

  startGame() {
    const startButton = document.getElementById('startButton');
  const gameArea = document.getElementById('gameArea');

  if (startButton && gameArea) {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    this.askQuestion();
    this.startTimer();
  }
  }

  askQuestion() {
    this.questionCount++;
    const questionNumberElement = document.getElementById('questionNumber');
    const questionElement = document.getElementById('question');
    if (questionNumberElement && questionElement) {

    questionNumberElement.textContent = String(this.questionCount);

    const operator = this.getRandomOperator();
    let num1, num2;
    switch (operator) {
      case '+':
        num1 = this.getRandomNumber(1, 9999);
        num2 = this.getRandomNumber(1, 9999);
        break;
      case '-':
        num2 = this.getRandomNumber(1, 9999);
        num1 = this.getRandomNumber(num2, 9999);
        break;
      case '*':
        num1 = this.getRandomNumber(1, 99);
        num2 = this.getRandomNumber(1, 99);
        break;
      case '/':
        num2 = this.getRandomNumber(1, 9999);
        num1 = num2 * this.getRandomNumber(1, 99);
        break;
    }

    questionElement.textContent = `${num1} ${operator} ${num2} = `;
  }
}

  getRandomOperator(): string {
    const operators = ['+', '-', '*', '/'];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timerWidth > 0) {
        this.timerWidth -= 100 / this.timerMaxWidth;
        const timerElement = document.getElementById('timer');
        if (timerElement) {
          const scale = this.timerWidth / 100;
          timerElement.style.transform = `scaleX(${scale})`;
        } else {
          clearInterval(this.timerInterval);
          // Handle the case when timerElement is null
        }
      } else {
        this.endGame();
      }
    }, 1000);
  }
  navigateTo(page: string){
    const currentUrl = this.router.url.split('/')[1]; // Get the current route path
  
    console.log(currentUrl);
  if (currentUrl !== page) {
     this.router.navigate([`/${page}`]); 
   }
   }
  endGame() {
    clearInterval(this.timerInterval);
    const answerInput = document.getElementById('answerInput') as HTMLInputElement;
    if (answerInput) {
      answerInput.disabled = true;
    }
  
    const validateButton = document.getElementById('validateButton') as HTMLButtonElement;
    if (validateButton) {
      validateButton.disabled = true;
    }
  
    const resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.style.display = 'block';
    }
  
    const correctAnswersElement = document.getElementById('correctAnswers');
    if (correctAnswersElement) {
      correctAnswersElement.textContent = String(this.correctAnswers);
    }
  
    this.score = this.correctAnswers;
  
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.textContent = String(this.score);
    }

    this.userService.mathRes(this.score).then((res) => {
      if (res) {
        this.mathScore = true;
        this.mathResult = res;
        this.navigateTo('pet');
        console.log(this.mathResult);
      }
  });
  }
  


  validateAnswer() {
    const answerInput = document.getElementById('answerInput') as HTMLInputElement;
    const questionElement = document.getElementById('question');
    const validateButton = document.getElementById('validateButton');
  
    if (
      answerInput &&
      questionElement &&
      validateButton &&
      validateButton.parentNode &&
      questionElement.textContent !== null &&
      questionElement.textContent !== undefined
    ) {
      const textContent = questionElement.textContent;
      const [num1, operator, num2] = textContent.split(' ');
  
      if (num1 !== undefined && operator !== undefined && num2 !== undefined) {
        const userAnswer = parseInt(answerInput.value, 10);
        let correctAnswer;
  
        switch (operator) {
          case '+':
            correctAnswer = parseInt(num1) + parseInt(num2);
            break;
          case '-':
            correctAnswer = parseInt(num1) - parseInt(num2);
            break;
          case '*':
            correctAnswer = parseInt(num1) * parseInt(num2);
            break;
          case '/':
            correctAnswer = parseInt(num1) / parseInt(num2);
            break;
        }
  
        if (userAnswer === correctAnswer) {
          this.correctAnswers++;
        }
  
        if (this.questionCount === 10) {
          this.endGame();
        } else {
          answerInput.value = '';
          this.askQuestion();
        }
      }
    }
  }
}
