import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNpcComponent } from './edit-npc.component';

describe('EditNpcComponent', () => {
  let component: EditNpcComponent;
  let fixture: ComponentFixture<EditNpcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNpcComponent]
    });
    fixture = TestBed.createComponent(EditNpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
