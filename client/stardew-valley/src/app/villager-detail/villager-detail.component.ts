import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-villager-detail',
  templateUrl: './villager-detail.component.html',
  styleUrls: ['./villager-detail.component.css']
})
export class VillagerDetailComponent implements OnInit {
  names: any[] = []
  name: any;
  villager: any;
  isDatable = false;
  editing = false;
  day = "";
  month = "";
  monthImg = "";
  genderImg = "";
  optimismImg = "";

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getNpcNames().subscribe((data: any[]) => {
      this.names = data
    })
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.name);
    this.apiService.getOneNpc(this.name).subscribe(
      data => {
        this.villager = data;
        // comprobar si es datable o no para mostrar el corazón
        if(this.villager.datable == 'datable'){
          this.isDatable = true;
        }
        // comprobar el mes de cumple para mostrar la imagen correspondiente
        this.month = this.villager.birthday.split(" ")[0];
        this.day = this.villager.birthday.split(" ")[1];
        console.log(this.month);
        if(this.month == "spring"){
          this.monthImg = "https://stardewvalleywiki.com/mediawiki/images/thumb/9/9c/Spring.png/24px-Spring.png";
        } else if(this.month == "summer"){
          this.monthImg = "https://stardewvalleywiki.com/mediawiki/images/thumb/8/85/Summer.png/24px-Summer.png";
        } else if(this.month == "fall"){
          this.monthImg = "https://stardewvalleywiki.com/mediawiki/images/thumb/5/5d/Fall.png/24px-Fall.png";
        } else if(this.month == "winter"){
          this.monthImg = "https://stardewvalleywiki.com/mediawiki/images/thumb/a/a7/Winter.png/24px-Winter.png";
        }
        // comprobar gender
        if(this.villager.gender == "female"){
          this.genderImg = "";
        } else if(this.villager.gender == "male"){
          this.genderImg = "";
        } else if(this.villager.gender == "undefined"){
          this.genderImg = "";
        }
        // comprobar optimism
        if(this.villager.optimism == "positive"){
          this.optimismImg = "https://stardewcommunitywiki.com/mediawiki/images/1/14/Emote_Happy.png";
        } else if(this.villager.optimism == "negative"){
          this.optimismImg = "https://stardewcommunitywiki.com/mediawiki/images/1/18/Emote_Angry.png";
        } else if(this.villager.optimism == "neutral"){
          this.optimismImg = "https://stardewcommunitywiki.com/mediawiki/images/0/05/Emote_Uh.gif";
        }
        console.log(this.villager);
      },
      error => {
        console.error('Error al obtener los detalles del villager', error);
      }
    );
  }

  deleteVillager(name: string){
    if(confirm("Are you sure you want to delete this villager?")){
      this.apiService.deleteNpc(name).subscribe(
        (response) => {
          console.log("Successful: " + response)
          this.router.navigate(["/npcs"])
          
        },
        (error) => {
          console.log("API Error" + error)
        }
      )
    }
      
  }

  submitElement(data: any, isNpc: boolean){
    console.log(data)
    data.name = this.villager.name
    data.datable = this.villager.datable
    data.relationships = " "
    data.start_location = "Town"
    data.birthday = data.month + " " + data.day
    console.log(data)
    if(confirm("Are you sure you want to edit this villager?")){
      this.apiService.editNpc(data).subscribe(
        (response) => {
          console.log(response);
        }, (error) => {
          console.log(error)
        })
    }
    
  }
}
