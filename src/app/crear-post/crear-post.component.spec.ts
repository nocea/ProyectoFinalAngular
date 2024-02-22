import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPostComponent } from './crear-post.component';

describe('CrearPostComponent', () => {
  let component: CrearPostComponent;
  let fixture: ComponentFixture<CrearPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPostComponent]
    });
    fixture = TestBed.createComponent(CrearPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
