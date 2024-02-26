import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NpcsComponent } from './npcs/npcs.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddElementComponent } from './add-element/add-element.component';
import { MyDatablePipe } from './custom.datablepipe';
import { VillagerDetailComponent } from './villager-detail/villager-detail.component';
import { MyDisplayBeforeEarnedPipe } from './custom.displaybeforeearnedpipe';
import { MyPreAchievementPipe } from './custom.prechievementpipe';
import { MyIsNullPipe } from './custom.isnullpipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NpcsComponent,
    AchievementsComponent,
    NavbarComponent,
    FooterComponent,
    AddElementComponent,
    MyDatablePipe,
    VillagerDetailComponent,
    MyDisplayBeforeEarnedPipe,
    MyPreAchievementPipe,
    MyIsNullPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
