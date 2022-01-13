import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsParentComponent } from './results-parent.component';

describe('ResultsParentComponent', () => {
  let component: ResultsParentComponent;
  let fixture: ComponentFixture<ResultsParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
