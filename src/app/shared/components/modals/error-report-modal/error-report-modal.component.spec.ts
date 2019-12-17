import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReportModalComponent } from './error-report-modal.component';

describe('ErrorReportModalComponent', () => {
  let component: ErrorReportModalComponent;
  let fixture: ComponentFixture<ErrorReportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorReportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
