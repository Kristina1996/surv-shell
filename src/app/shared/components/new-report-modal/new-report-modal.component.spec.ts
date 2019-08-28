import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReportModalComponent } from './new-report-modal.component';

describe('NewReportModalComponent', () => {
  let component: NewReportModalComponent;
  let fixture: ComponentFixture<NewReportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
