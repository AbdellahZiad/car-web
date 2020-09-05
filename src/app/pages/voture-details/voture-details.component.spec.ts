import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotureDetailsComponent } from './voture-details.component';

describe('VotureDetailsComponent', () => {
  let component: VotureDetailsComponent;
  let fixture: ComponentFixture<VotureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
