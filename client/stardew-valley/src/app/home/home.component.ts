import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  randomNpc: any;

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getRandomNpc().subscribe(((data: any) => {
      this.randomNpc = data
    }))
  }
}
