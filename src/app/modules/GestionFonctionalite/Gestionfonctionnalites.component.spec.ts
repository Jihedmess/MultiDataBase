import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFonctionnalitesComponent } from './Gestionfonctionnalites.component';

describe('FonctionnalitesComponent', () => {
  let component: GestionFonctionnalitesComponent;
  let fixture: ComponentFixture<GestionFonctionnalitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionFonctionnalitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFonctionnalitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
