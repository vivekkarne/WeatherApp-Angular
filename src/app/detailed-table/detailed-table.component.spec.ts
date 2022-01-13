import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTableComponent } from './detailed-table.component';

describe('DetailedTableComponent', () => {
  let component: DetailedTableComponent;
  let fixture: ComponentFixture<DetailedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
