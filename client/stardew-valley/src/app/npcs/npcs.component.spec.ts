import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcsComponent } from './npcs.component';

describe('NpcsComponent', () => {
  let component: NpcsComponent;
  let fixture: ComponentFixture<NpcsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NpcsComponent]
    });
    fixture = TestBed.createComponent(NpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
