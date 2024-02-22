import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-villager-detail',
  templateUrl: './villager-detail.component.html',
  styleUrls: ['./villager-detail.component.css']
})
export class VillagerDetailComponent implements OnInit {
  name: any;
  villager: any;
  isDatable = false;
  day = "";
  month = "";
  monthImg = "";
  genderImg = "";
  optimismImg = "";

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
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
}
