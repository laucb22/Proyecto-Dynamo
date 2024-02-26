import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import swal from 'sweetalert2';
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

  checkName(name: any){
    if(name === this.randomNpc.name){
      swal.fire({
        title: "Congratulations! It's " + this.randomNpc.name,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/assets/confetti.gif")
          center top
          repeat
        `
      });
    } else{
      swal.fire({
        title: "Nope! It's not " + name,
        icon: "error"
      });
    }
  }

}
