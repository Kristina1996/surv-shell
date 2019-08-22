import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPartComponent } from './common-part.component';

describe('CommonPartComponent', () => {
  let component: CommonPartComponent;
  let fixture: ComponentFixture<CommonPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
