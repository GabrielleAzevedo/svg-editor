import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShapeService } from '../services/shape.service';

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private sub!: Subscription;

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.sub = this.shapeService.shapeCommand$.subscribe((command) => {
      const ctx = this.prepareContext();
      if (!ctx) return;

      if (command === 'rectangle') {
        this.drawRectangle(ctx);
      } else if (command === 'star') {
        this.drawStar(ctx);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private prepareContext(): CanvasRenderingContext2D | null {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return null;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.scale(dpr, dpr);
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx = context;
    return context;
  }

  private drawRectangle(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(10, 10, 200, 100);
  }

  private drawStar(ctx: CanvasRenderingContext2D) {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.clientWidth / 2;
    const centerY = canvas.clientHeight / 2;
    const radius = 100;
    const points = 5;

    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI / points) * i;
      const r = i % 2 === 0 ? radius : radius / 2;
      const px = centerX + r * Math.sin(angle);
      const py = centerY - r * Math.cos(angle);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
  }
}
