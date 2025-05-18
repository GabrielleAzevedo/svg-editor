import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ShapeCommand = 'rectangle' | 'star';

@Injectable({
  providedIn: 'root',
})

export class ShapeService {
  private shapeCommandSource = new Subject<ShapeCommand>();
  shapeCommand$ = this.shapeCommandSource.asObservable();

  triggerShape(command: ShapeCommand) {
    this.shapeCommandSource.next(command);
  }
}
