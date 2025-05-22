import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShapeData, ShapeService } from '../services/shape.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
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
    this.shapeService.selectedShape$.subscribe((shape) => {
      if (shape) {
        this.redrawShape(shape);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private redrawShape(shape: ShapeData) {
    const svg = this.canvasRef.nativeElement;
    const elements = Array.from(svg.children) as SVGElement[];


    elements.forEach((el) => {
      if (
        (shape.type === 'rect' && el.tagName === 'rect') ||
        (shape.type === 'star' && el.tagName === 'polygon')
      ) {
        svg.removeChild(el);
      }
    });

    this.renderShape(shape);
  }

  private renderShape(shape: ShapeData) {
    const svg = this.canvasRef.nativeElement;
    let el: SVGElement;

    if (shape.type === 'rect') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      for (const attr in shape.attributes) {
        el.setAttribute(attr, shape.attributes[attr]);
      }
    } else if (shape.type === 'star') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      const points = this.calculateStarPoints(
        +shape.attributes['cx'],
        +shape.attributes['cy'],
        +shape.attributes['outerRadius'],
        +shape.attributes['innerRadius'],
        Math.max(3, +shape.attributes['starPoints']) // não deixa menos que 3
      );
      el.setAttribute('points', points);

  
      for (const attr in shape.attributes) {
        if (attr !== 'cx' && attr !== 'cy' && attr !== 'outerRadius' && attr !== 'innerRadius' && attr !== 'starPoints') {
          el.setAttribute(attr, shape.attributes[attr]);
        }
      }
    } else {
      return;
    }
    el.addEventListener('click', (event) => {
    event.stopPropagation(); // evita que clique no svg pai também dispare algo
    this.shapeService.selectShape(shape);
    });

    svg.appendChild(el);
  }

  private drawRectangle() {
    const rectData: ShapeData = {
      type: 'rect',
      attributes: {
        x: '10',
        y: '10',
        width: '200',
        height: '100',
        rx: '0',
        fill: '#ffc0cb',
        stroke: '#000000'
      },
    };

    this.shapeService.addShape(rectData);
    this.shapeService.selectShape(rectData);
    this.renderShape(rectData);
    this.shapeService.showPropertiesPanel(true);
  }

  private drawStar() {
    const svg = this.canvasRef.nativeElement;
    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    const outerRadius = 100;
    const innerRadius = 50;
    const starPoints = 5;

    const starData: ShapeData = {
      type: 'star',
      attributes: {
        cx: String(centerX),
        cy: String(centerY),
        outerRadius: String(outerRadius),
        innerRadius: String(innerRadius),
        starPoints: String(starPoints),
        fill: '#ffff00',
        stroke: '#000000',
      },
    };

    this.shapeService.addShape(starData);
    this.shapeService.selectShape(starData);
    this.renderShape(starData);
    this.shapeService.showPropertiesPanel(true);
  }

  private calculateStarPoints(
    centerX: number,
    centerY: number,
    outerRadius: number,
    innerRadius: number,
    numPoints: number
  ): string {
    const step = Math.PI / numPoints;
    let path = '';
    for (let i = 0; i < 2 * numPoints; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2; // para a estrela "apontar para cima"
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      path += `${x},${y} `;
    }
    return path.trim();
  }
}

