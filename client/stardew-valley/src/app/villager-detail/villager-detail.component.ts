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

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.name);
    this.apiService.getOneNpc(this.name).subscribe(
      data => {
        this.villager = data;
        console.log(this.villager);
      },
      error => {
        console.error('Error al obtener los detalles del villager', error);
      }
    );
  }
}
