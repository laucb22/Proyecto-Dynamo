import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NpcsComponent } from './npcs/npcs.component';
import { HomeComponent } from './home/home.component';
import { EditNpcComponent } from './edit-npc/edit-npc.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';
import { AddElementComponent } from './add-element/add-element.component';
import { VillagerDetailComponent } from './villager-detail/villager-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'npcs', component: NpcsComponent},
  {path: 'edit-npc', component: EditNpcComponent},
  {path: 'achievements', component: AchievementsComponent},
  {path: 'edit-achievement', component: EditAchievementComponent},
  {path: 'add-element', component: AddElementComponent},
  {path: 'villager-detail/:name', component: VillagerDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
