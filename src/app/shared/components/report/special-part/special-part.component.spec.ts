import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPartComponent } from './special-part.component';

describe('SpecialPartComponent', () => {
  let component: SpecialPartComponent;
  let fixture: ComponentFixture<SpecialPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
