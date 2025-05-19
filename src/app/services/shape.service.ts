import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type ShapeCommand = 'rectangle' | 'star';

export interface ShapeData{
  type: 'rect' | 'star';
  attributes:{ [key:string]: string};
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

  triggerShape(command: ShapeCommand) {
    this.shapeCommandSource.next(command);
  }
  
  addShape(shape: ShapeData){
    this.shapes.push(shape);
    this.shapesSubject.next([...this.shapes]);
  }

  getShapes(): ShapeData[]{
    return [...this.shapes];
  }

  clearShapes() {
    this.shapes = [];
    this.shapesSubject.next([]);
  }
}
