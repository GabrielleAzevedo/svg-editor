import { Component } from '@angular/core';
import { ShapeService, ShapeData } from '../services/shape.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties-panel',
  imports: [FormsModule, CommonModule],
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.scss',
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

  onInnerRadiusChange(event: Event) {
    if (!this.shape) return;

    const input = event.target as HTMLInputElement;
    let value = Number(input.value);
    const outerRadius = Number(this.shape.attributes['outerRadius']) || 100;

    // Garantir valores válidos
    if (value < 1) value = 1;
    if (value > outerRadius) value = outerRadius;

    this.shape.attributes['innerRadius'] = value.toString();
    this.shapeService.updateSelectedShape(this.shape);
  }

  onFillChange(event: Event) {
    if (!this.shape) return;
    const value = (event.target as HTMLInputElement).value;
    this.shape.attributes['fill'] = value;
    this.shapeService.updateSelectedShape(this.shape);
  }

  onStrokeChange(event: Event) {
    if (!this.shape) return;
    const value = (event.target as HTMLInputElement).value;
    this.shape.attributes['stroke'] = value;
    this.shapeService.updateSelectedShape(this.shape);
  }
}
