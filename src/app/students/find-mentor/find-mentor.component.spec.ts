import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMentorComponent } from './find-mentor.component';

describe('FindMentorComponent', () => {
  let component: FindMentorComponent;
  let fixture: ComponentFixture<FindMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindMentorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
