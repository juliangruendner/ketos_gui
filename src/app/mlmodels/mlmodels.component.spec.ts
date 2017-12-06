import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlmodelsComponent } from './mlmodels.component';

describe('MlmodelsComponent', () => {
  let component: MlmodelsComponent;
  let fixture: ComponentFixture<MlmodelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlmodelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
