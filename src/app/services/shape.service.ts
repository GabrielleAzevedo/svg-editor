import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type ShapeCommand = 'rectangle' | 'star';

export interface ShapeData {
  type: 'rect' | 'star';
  attributes: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  private shapeCommandSource = new Subject<ShapeCommand>();
  shapeCommand$ = this.shapeCommandSource.asObservable();

  private shapes: ShapeData[] = [];
  private shapesSubject = new BehaviorSubject<ShapeData[]>([]);
  shapes$ = this.shapesSubject.asObservable();

  private selectedShapeSubject = new BehaviorSubject<ShapeData | null>(null);
  selectedShape$ = this.selectedShapeSubject.asObservable();

  private showPropertiesPanelSubject = new BehaviorSubject<boolean>(false);
  showPropertiesPanel$ = this.showPropertiesPanelSubject.asObservable();

  showPropertiesPanel(show: boolean) {
    this.showPropertiesPanelSubject.next(show);
  }

  selectShape(shape: ShapeData | null) {
    this.selectedShapeSubject.next(shape);
  }

  updateSelectedShape(updatedShape: ShapeData) {
  this.selectedShapeSubject.next(updatedShape);
}

  triggerShape(command: ShapeCommand) {
    this.shapeCommandSource.next(command);
  }

  addShape(shape: ShapeData) {
    this.shapes.push(shape);
    this.shapesSubject.next([...this.shapes]);
  }

  getShapes(): ShapeData[] {
    return [...this.shapes];
  }

  clearShapes() {
    this.shapes = [];
    this.shapesSubject.next([]);
  }
}
