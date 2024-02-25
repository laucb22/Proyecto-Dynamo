import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent {

  constructor(private api: ApiService){}

  achievements: any[] = []

  ngOnInit() {
    this.getAchievements()
  }

  refresh(){
    window.location.reload();
  }

  filterAchievements(data: any){
    this.api.getFilteredAchievements(data).subscribe((data: any[]) => {
      this.achievements = data
    })
  }

  getAchievements(){
    this.api.getAchievements().subscribe((data: any[]) => {
      this.achievements = data
    })
  }

}
