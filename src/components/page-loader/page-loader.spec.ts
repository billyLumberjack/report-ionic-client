import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageLoaderComponent } from './page-loader';

// Guard test for Ionic 7 → 8 migration.
// Verifies the component compiles and renders with Angular 22 after the
// Ionic upgrade. Ionic custom elements are stubbed via CUSTOM_ELEMENTS_SCHEMA
// (the pattern used throughout this test suite — Ionic ships ESM-only packages
// that cannot be loaded by Jest's CommonJS transform).
describe('PageLoaderComponent (Ionic upgrade guard)', () => {
  let component: PageLoaderComponent;
  let fixture: ComponentFixture<PageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLoaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component without throwing', () => {
    expect(component).toBeTruthy();
  });

  it('renders the loading element', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('#my-page-loader');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Loading');
  });
});
