import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResidentComponent } from './dashboard-resident.component';

describe('DashboardResidentComponent', () => {
  let component: DashboardResidentComponent;
  let fixture: ComponentFixture<DashboardResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardResidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
