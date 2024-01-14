import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
})
export class RunComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  score = 0;
  obstacleWidth = 20;
  obstacleHeight = 20;
  jumpHeight = 0;
  jumpSpeed = 2;
  isJumping = false;
  dinoY = 0;
  dinoX = 0;
  obstacleX = 0;
  gameInterval!: ReturnType<typeof setInterval>;
  groundY = 0;

  runScore: boolean = false;
  runResult: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.dinoY = canvas.height - 30;
    this.dinoX = 50;
    this.obstacleX = canvas.width;
    this.groundY = this.dinoY + 20;

    this.gameInit(canvas, ctx);
  }

  updateScore() {
    this.score += 2;
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.textContent = 'Score: ' + this.score;
    }
  }

  drawGround(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, this.groundY, ctx.canvas.width, 2);
  }

  drawDino(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.dinoX, this.dinoY - this.jumpHeight, 30, 20);
  }

  drawObstacle(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.fillRect(
      this.obstacleX,
      this.groundY - this.obstacleHeight,
      this.obstacleWidth,
      this.obstacleHeight
    );
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpHeight = 0;
      const jumpInterval = setInterval(() => {
        this.jumpHeight += this.jumpSpeed;
        if (this.jumpHeight >= 60 || !this.isJumping) {
          clearInterval(jumpInterval);
          const fallInterval = setInterval(() => {
            this.jumpHeight -= 2;
            if (this.jumpHeight <= 0) {
              clearInterval(fallInterval);
              this.isJumping = false;
            }
          }, 16);
        }
      }, 16);
    }
  }

  updateGameArea(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawGround(ctx);
    this.drawDino(ctx);
    this.drawObstacle(ctx);
    this.obstacleX -= 3 + Math.floor(this.score / 100);
    if (this.obstacleX < -20) {
      this.obstacleX = ctx.canvas.width + Math.random() * 200;
      this.obstacleWidth = Math.random() < 0.5 ? 40 : 20;
      this.obstacleHeight = Math.random() < 0.5 ? 30 : 20;
      this.updateScore();
    }

    if (
      this.dinoX < this.obstacleX + this.obstacleWidth &&
      this.dinoX + 20 > this.obstacleX &&
      this.dinoY - this.jumpHeight < this.groundY &&
      this.dinoY - this.jumpHeight + 20 > this.groundY - this.obstacleHeight
    ) {
      clearInterval(this.gameInterval);
      this.userService.runRes(this.score).then((res) => {
        if (res) {
          this.runScore = true;
          this.runResult = res;
          this.navigateTo('pet');
          console.log(this.runResult);
        }
      });
    }
  }

  gameInit(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.gameInterval = setInterval(() => this.updateGameArea(ctx), 16);
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.keyCode === 32 || event.keyCode === 38) {
        this.jump();
      }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.keyCode === 32 || event.keyCode === 38) {
        this.isJumping = false;
      }
    });
  }

  navigateTo(page: string) {
    const currentUrl = this.router.url.split('/')[1];
    console.log(currentUrl);
    if (currentUrl !== page) {
      this.router.navigate([`/${page}`]);
    }
  }
}
