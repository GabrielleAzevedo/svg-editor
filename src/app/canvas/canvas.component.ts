import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShapeData, ShapeService } from '../services/shape.service';

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

  private renderShape(shape: ShapeData){
    const svg = this.canvasRef.nativeElement;
    let el: SVGElement;

    if(shape.type === 'rect'){
      el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    }else if (shape.type === 'star'){
      el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    } else {
      return;
    }

    for (const attr in shape.attributes){
      el.setAttribute(attr, shape.attributes[attr]);
    }

    svg.appendChild(el);
  }

  // usar quando tiver o localStorage
  // private renderAllShapes(shapes: ShapeData[]){
  //   const svg = this.canvasRef.nativeElement;
  //   svg.innerHTML = '';
  //   shapes.forEach(shape => this.renderShape(shape));
  // }

  private drawRectangle() {
    const rectData: ShapeData = {
      type: 'rect',
      attributes: {
        x: '10',
        y: '10',
        width: '200',
        height: '100',
        fill: 'pink'
      }
    };

    this.shapeService.addShape(rectData);
    this.renderShape(rectData);
  }

  private drawStar() {

    const svg = this.canvasRef.nativeElement;

    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    const radius = 100;
    const starPoints = 5;

    let path = '';
    for (let i = 0; i < starPoints * 2; i++) {
      const angle = (Math.PI / starPoints) * i;
      const r = i % 2 === 0 ? radius : radius / 2;
      const x = centerX + r * Math.sin(angle);
      const y = centerY - r * Math.cos(angle);
      path += `${x},${y} `;
    }

    const starData: ShapeData = {
      type: 'star',
      attributes: {
        points: path.trim(),
        starPoints: String(starPoints),
        fill: 'yellow'
      }
    };

    this.shapeService.addShape(starData);
    this.renderShape(starData);
  }
}
