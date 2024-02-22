import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  randomNpc: any;
  names: any[] = [];
  choices: string[] = []

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getRandomNpc().subscribe(((data: any) => {
      this.randomNpc = data
    }));
    this.api.getNpcNames().subscribe(((data: any[]) => {
      this.names = data
      this.fillChoices()
    }))
    
  }


  commence(){
    console.log(this.choices)
    
  }

  fillChoices(){
    for(let i = 0; i < 5; i++){
      this.choices.push(this.names[Math.floor(Math.random() * this.names.length)])
    }
    
  }

  
}
