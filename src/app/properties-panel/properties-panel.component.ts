import { Component } from '@angular/core';
import { ShapeService, ShapeData } from '../services/shape.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties-panel',
  imports: [FormsModule, CommonModule],
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.scss'
})
export class PropertiesPanelComponent {
  shape: ShapeData | null = null;

  constructor(private shapeService: ShapeService) {
    this.shapeService.selectedShape$.subscribe((shape) => {
      this.shape = shape;
    });
  }

  onRxChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.shape) {
      this.shape.attributes['rx'] = value;
      this.shapeService.updateSelectedShape(this.shape);
    }
  }

  onStarPointsChange(event: Event) {
    const value = Math.max(3, Number((event.target as HTMLInputElement).value));
    if (this.shape) {
      this.shape.attributes['starPoints'] = value.toString();
      this.shapeService.updateSelectedShape(this.shape);
    }
  }

  
}


