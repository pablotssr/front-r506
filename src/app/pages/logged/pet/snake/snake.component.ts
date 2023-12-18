import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;
  snake = [{ x: 40, y: 180 }, { x: 60, y: 180 }];
  food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
  dx = 20;
  dy = 0;
  score = 0;
  moving = false;
  isGameOver: boolean = false;
  
  snakeScore: boolean = false;
  snakeResult: any = {};

  constructor( private router: Router,    private userService: UserService,

    ) {}


  ngOnInit(): void {
      const canvas = this.gameCanvas.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      this.initGame();
      document.addEventListener('keydown', this.keyDownHandler.bind(this));
      
      
        this.gameLoop();
      
  }

  gameLoop(): void {
    if (this.isGameOver === false) {
      this.move();
      this.draw();
      setTimeout(() => {
        this.gameLoop();
      }, 100);
    } else {
      console.log("aaaaa")
    }
  }


  initGame(): void {
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
    this.snake.forEach(segment => {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(segment.x, segment.y, 20, 20);
    });
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.x, this.food.y, 20, 20);
    this.score = this.score;
  }



   generateFood(): void {
    let validFood = false;
    let newFoodX: number | undefined;
    let newFoodY: number | undefined;
  
    while (!validFood) {
      newFoodX = Math.floor(Math.random() * 20) * 20;
      newFoodY = Math.floor(Math.random() * 20) * 20;
  
      validFood = !this.snake.some(segment => segment.x === newFoodX && segment.y === newFoodY);
    }
  
    if (newFoodX !== undefined && newFoodY !== undefined) {
      this.food = { x: newFoodX, y: newFoodY };
    }
  }

  move(): void {
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
      this.generateFood();
      this.score += 1;
    } else {
      this.snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= this.gameCanvas.nativeElement.width || head.y >= this.gameCanvas.nativeElement.height) {
      
      this.isGameOver = true;
      this.userService.snakeRes(this.score).then((res) => {
        if (res) {
          this.snakeScore = true;
          this.snakeResult = res;
          this.navigateTo('pet');
          console.log(this.snakeResult);
        }
    });
      this.navigateTo('pet');
    }

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        
        this.isGameOver = true;
        this.navigateTo('pet');
        this.userService.snakeRes(this.score).then((res) => {
          if (res) {
            this.snakeScore = true;
            this.snakeResult = res;
            this.navigateTo('pet');
            console.log(this.snakeResult);
          }
      });
      }
    }

    this.moving = false;
  }

  keyDownHandler(e: KeyboardEvent): void {
    if (!this.moving) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        if (this.dx !== -20) {
          this.dx = 20;
          this.dy = 0;
          this.moving = true;
        }
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        if (this.dx !== 20) {
          this.dx = -20;
          this.dy = 0;
          this.moving = true;
        }
      } else if (e.key === 'Up' || e.key === 'ArrowUp') {
        if (this.dy !== 20) {
          this.dx = 0;
          this.dy = -20;
          this.moving = true;
        }
      } else if (e.key === 'Down' || e.key === 'ArrowDown') {
        if (this.dy !== -20) {
          this.dx = 0;
          this.dy = 20;
          this.moving = true;
        }
      }
    }
  }

  resetGame(): void {
    this.snake = [{ x: 40, y: 180 }, { x: 60, y: 180 }];
    this.dx = 20;
    this.dy = 0;
    this.score = 0;
  }

  navigateTo(page: string){
    const currentUrl = this.router.url.split('/')[1]; // Get the current route path
  
    console.log(currentUrl);
  if (currentUrl !== page) {
     this.router.navigate([`/${page}`]); 
   }
   }
}
