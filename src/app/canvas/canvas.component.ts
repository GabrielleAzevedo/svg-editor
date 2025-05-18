import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShapeService } from '../services/shape.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvasSvg', { static: true })
  canvasRef!: ElementRef<SVGSVGElement>;

  private sub!: Subscription;

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.sub = this.shapeService.shapeCommand$.subscribe((command) => {
      if (command === 'rectangle') {
        this.drawRectangle();
      } else if (command === 'star') {
        this.drawStar();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private clearSvg() {
    const svg = this.canvasRef.nativeElement;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
  }

  private drawRectangle() {
    this.clearSvg();

    const svg = this.canvasRef.nativeElement;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    rect.setAttribute('x', '10');
    rect.setAttribute('y', '10');
    rect.setAttribute('width', '200');
    rect.setAttribute('height', '100');
    rect.setAttribute('fill', 'pink');

    svg.appendChild(rect);
  }

  private drawStar() {
    this.clearSvg();

    const svg = this.canvasRef.nativeElement;
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    const radius = 100;
    const points = 5;

    let path = '';
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI / points) * i;
      const r = i % 2 === 0 ? radius : radius / 2;
      const x = centerX + r * Math.sin(angle);
      const y = centerY - r * Math.cos(angle);
      path += `${x},${y} `;
    }

    star.setAttribute('points', path.trim());
    star.setAttribute('fill', 'yellow');

    svg.appendChild(star);
  }
}
