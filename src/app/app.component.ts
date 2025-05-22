import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CanvasComponent } from "./canvas/canvas.component";
import { PropertiesPanelComponent } from "./properties-panel/properties-panel.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, CanvasComponent, PropertiesPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'svg-editor';
}
