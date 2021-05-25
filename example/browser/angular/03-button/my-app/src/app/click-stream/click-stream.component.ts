import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-stream',
  templateUrl: './click-stream.component.html',
  styleUrls: ['./click-stream.component.css']
})
export class ClickStreamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickMe() {
    window.alert("click");
  }

}
