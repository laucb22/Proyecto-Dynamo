import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAchievementComponent } from './edit-achievement.component';

describe('EditAchievementComponent', () => {
  let component: EditAchievementComponent;
  let fixture: ComponentFixture<EditAchievementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAchievementComponent]
    });
    fixture = TestBed.createComponent(EditAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
