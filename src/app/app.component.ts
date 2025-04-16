import { Component } from '@angular/core';
import { FrameComponent } from "./Components/frame/frame.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'le-petit-cathabard';
}
