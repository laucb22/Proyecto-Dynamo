import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NpcsComponent } from './npcs/npcs.component';
import { AddNpcComponent } from './add-npc/add-npc.component';
import { EditNpcComponent } from './edit-npc/edit-npc.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { NewAchievementComponent } from './new-achievement/new-achievement.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NpcsComponent,
    AddNpcComponent,
    EditNpcComponent,
    AchievementsComponent,
    NewAchievementComponent,
    EditAchievementComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
