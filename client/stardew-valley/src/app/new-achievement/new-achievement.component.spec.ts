import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAchievementComponent } from './new-achievement.component';

describe('NewAchievementComponent', () => {
  let component: NewAchievementComponent;
  let fixture: ComponentFixture<NewAchievementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAchievementComponent]
    });
    fixture = TestBed.createComponent(NewAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
