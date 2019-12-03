import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompleteComponent } from './input-autocomplete.component';

describe('InputAutocompleteComponent', () => {
  let component: InputAutocompleteComponent;
  let fixture: ComponentFixture<InputAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
