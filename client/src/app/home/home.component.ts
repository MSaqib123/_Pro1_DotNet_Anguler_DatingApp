import { Component } from '@angular/core';
import { ContainerComponent } from "../shared/container/container.component";

@Component({
  selector: 'app-home',
  imports: [ContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  registerMode = false;

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

}
