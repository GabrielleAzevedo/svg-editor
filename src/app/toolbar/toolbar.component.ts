import { Component } from '@angular/core';
import { ShapeService } from '../services/shape.service';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor(private shapeService: ShapeService) {}

  drawRectangleOnClick() {
    this.shapeService.triggerShape('rectangle');
  }

  drawStarOnClick() {
    this.shapeService.triggerShape('star');
  }
}
