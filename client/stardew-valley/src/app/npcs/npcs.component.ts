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
    this.api.getNpcs().subscribe((data: any[]) => {
      this.npcs = data
    })
  }

  refresh(){
    window.location.reload();
  }

  applyFilters(filters: any){
    this.api.getFilteredNpcs(filters).subscribe((data: any[]) => {
      this.npcs = data;
    })
  }

  clearFilters(){
    this.api.getNpcs().subscribe((data: any[]) => {
      this.npcs = data;
    })
  }
}
