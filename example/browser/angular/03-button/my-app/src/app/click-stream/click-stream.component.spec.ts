import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickStreamComponent } from './click-stream.component';

describe('ClickStreamComponent', () => {
  let component: ClickStreamComponent;
  let fixture: ComponentFixture<ClickStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
