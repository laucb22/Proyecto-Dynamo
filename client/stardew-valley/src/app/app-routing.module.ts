import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NpcsComponent } from './npcs/npcs.component';
import { AddNpcComponent } from './add-npc/add-npc.component';
import { HomeComponent } from './home/home.component';
import { EditNpcComponent } from './edit-npc/edit-npc.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { NewAchievementComponent } from './new-achievement/new-achievement.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'npcs', component: NpcsComponent},
  {path: 'add-npc', component: AddNpcComponent},
  {path: 'edit-npc', component: EditNpcComponent},
  {path: 'achievements', component: AchievementsComponent},
  {path: 'new-achievement', component: NewAchievementComponent},
  {path: 'edit-achievement', component: EditAchievementComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
