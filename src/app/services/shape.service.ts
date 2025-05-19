import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type ShapeCommand = 'rectangle' | 'star';

@Injectable({
  providedIn: 'root',
})

export class ShapeService {
  private shapeCommandSource = new Subject<ShapeCommand>();
  shapeCommand$ = this.shapeCommandSource.asObservable();

  private shapes: SVGElement[] = [];
  private shapesSubject = new BehaviorSubject<SVGElement[]>([]);
  shapes$ = this.shapesSubject.asObservable();

  triggerShape(command: ShapeCommand) {
    this.shapeCommandSource.next(command);
  }
  
  addShape(shape: SVGElement){
    this.shapes.push(shape);
    this.shapesSubject.next([...this.shapes]);
  }

  getShapes(): SVGElement[]{
    return [...this.shapes];
  }

  clearShapes() {
    this.shapes = [];
    this.shapesSubject.next([]);
  }
}
