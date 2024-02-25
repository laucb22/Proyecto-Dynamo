import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-npcs',
  templateUrl: './npcs.component.html',
  styleUrls: ['./npcs.component.css']
})
export class NpcsComponent {
  constructor(private api: ApiService){}


  npcs: any[] = []

  ngOnInit() {
    this.getNpcs()
  }

  refresh(){
    window.location.reload();
  }

  applyFilters(filters: any){
    if(filters.gender == ""){
      delete(filters.gender)
    }
    if(filters.manners == ""){
      delete(filters.manners)
    }
    if(filters.datable == ""){
      delete(filters.genders)
    }
    this.api.getFilteredNpcs(filters).subscribe((data: any[]) => {
      this.npcs = data;
    })
  }

  getNpcs(){
    this.api.getNpcs().subscribe((data: any[]) => {
      this.npcs = data
    })
  }
}
