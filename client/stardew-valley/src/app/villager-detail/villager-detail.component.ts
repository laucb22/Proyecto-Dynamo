import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import swal from 'sweetalert2';

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
          this.monthImg = "./../../assets/spring-flower.png";
        } else if(this.month == "summer"){
          this.monthImg = "./../../assets/ice-cream.png";
        } else if(this.month == "fall"){
          this.monthImg = "./../../assets/fall-leaf.png";
        } else if(this.month == "winter"){
          this.monthImg = "./../../assets/christmas-tree.png";
        }
        // comprobar gender
        if(this.villager.gender == "female"){
          this.genderImg = "./../../assets/female.png";
        } else if(this.villager.gender == "male"){
          this.genderImg = "./../../assets/male.png";
        } else if(this.villager.gender == "undefined"){
          this.genderImg = "./../../assets/undefined.png";
        }
        // comprobar optimism
        if(this.villager.optimism == "positive"){
          this.optimismImg = "https://stardewcommunitywiki.com/mediawiki/images/d/d1/Emojis001.png";
        } else if(this.villager.optimism == "negative"){
          this.optimismImg = "https://stardewcommunitywiki.com/mediawiki/images/b/b2/Emojis014.png";
        } else if(this.villager.optimism == "neutral"){
          this.optimismImg = "https://stardewcommunitywiki.com/mediawiki/images/8/8a/Emojis011.png";
        }
        console.log(this.villager);
      },
      error => {
        console.error('Error al obtener los detalles del villager', error);
      }
    );
  }

  deleteVillager(name: string){
    swal.fire({
      title: "Are yoy sure?",
      text: "You are about to kick out a villager!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, kick'em out!"
    }).then((result) =>{
      if (result.isConfirmed){
      this.apiService.deleteNpc(name).subscribe(
        (response) => {
          console.log("Successful: " + response)
          swal.fire({
            text: "This villager has moved out! :(",
            icon: "success"
          });
          this.router.navigate(["/npcs"])
        },
        (error) => {
          console.log("API Error" + error)
        }
      )
    }
  }); 
  }

  submitElement(data: any, isNpc: boolean){
    console.log(data)
    data.name = this.villager.name
    data.datable = this.villager.datable
    data.relationships = " "
    data.start_location = "Town"
    data.birthday = data.month + " " + data.day
    console.log(data)
    swal.fire({
      title: "Are you sure?",
      text: "You are going to update a villager's data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, go on!"
    }).then((result) =>{
      if (result.isConfirmed){
        this.apiService.editNpc(data).subscribe(
          (response) => {
            console.log(response);
            swal.fire({
              text: "Changes submitted!",
              icon: "success"
            });
            this.editing = false;
          }, (error) => {
            console.log(error)
          })
      }
    }); 
  }
}
