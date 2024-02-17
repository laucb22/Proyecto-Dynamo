import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNpcComponent } from './add-npc.component';

describe('AddNpcComponent', () => {
  let component: AddNpcComponent;
  let fixture: ComponentFixture<AddNpcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNpcComponent]
    });
    fixture = TestBed.createComponent(AddNpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
