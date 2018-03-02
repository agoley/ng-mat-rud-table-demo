import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any[];
  action: string;
  event: string;

  constructor() {
    this.data = [
      {
        color: "red",
        value: "#f00"
      },
      {
        color: "green",
        value: "#0f0"
      },
      {
        color: "blue",
        value: "#00f"
      },
      {
        color: "cyan",
        value: "#0ff"
      },
      {
        color: "magenta",
        value: "#f0f"
      },
      {
        color: "yellow",
        value: "#ff0"
      },
      {
        color: "black",
        value: "#000"
      }
    ]
  }

  onUpdate(event) {
    this.action = 'Update Triggered'
    this.event = JSON.stringify(event);
  }

  onDelete(event) {
    this.action = 'Delete Triggered'
    this.event = JSON.stringify(event);
  }
}
