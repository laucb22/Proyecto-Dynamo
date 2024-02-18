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
    this.api.getAchievements().subscribe((data: any[]) => {
      this.achievements = data
    })
  }

  refresh(){
    window.location.reload();
  }
}
