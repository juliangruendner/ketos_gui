import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceConfigComponent } from './resource-config.component';

describe('ResourceConfigComponent', () => {
  let component: ResourceConfigComponent;
  let fixture: ComponentFixture<ResourceConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
