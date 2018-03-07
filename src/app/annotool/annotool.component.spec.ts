import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotoolComponent } from './annotool.component';

describe('AnnotoolComponent', () => {
  let component: AnnotoolComponent;
  let fixture: ComponentFixture<AnnotoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
