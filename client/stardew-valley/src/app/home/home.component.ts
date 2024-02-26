import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import * as confetti from 'canvas-confetti';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  randomNpc: any;
  names: string[] = [];

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getRandomNpc().subscribe(((data: any) => {
      this.randomNpc = data
      this.api.getNpcOptions(this.randomNpc.name).subscribe(((data: any[]) => {
        this.names = data
      }))
    }));

    
  }


  commence(){
    console.log(this.names)
    
  }

  checkName(name: any){
    if(name === this.randomNpc.name){
      confetti.create()({
        shapes: ['star'],
        particleCount: 600,
        spread: 100,
        origin: {
            y: (1),
            x: (0.5)
        }
    });
    }
  }

  
}
