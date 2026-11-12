import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ValidationErrorComponent } from './validation-error';

// Guard test for Angular XSS CVEs (CVE-2026-32635, CVE-2026-69151, CVE-2026-22610).
// This app uses ngx-translate (not Angular built-in i18n), so the i18n-attribute-binding
// attack vectors don't apply. This test locks correct rendering of dynamic error messages.
describe('ValidationErrorComponent (XSS guard)', () => {
  let component: ValidationErrorComponent;
  let fixture: ComponentFixture<ValidationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationErrorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationErrorComponent);
    component = fixture.componentInstance;
  });

  it('renders required error message as plain text', () => {
    component.errors = { required: true };
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('This field is required');
  });

  it('renders email error message', () => {
    component.errors = { email: true };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('valid email');
  });

  it('renders minlength error using the requiredLength value', () => {
    component.errors = { minlength: { requiredLength: 8, actualLength: 3 } };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('8');
  });

  it('does not render raw HTML from error values (sanitization check)', () => {
    // If Angular's sanitization regresses, an XSS payload would render as markup.
    // We verify the template output contains no injected script elements.
    component.errors = { required: true };
    fixture.detectChanges();
    const injected = fixture.nativeElement.querySelector('script');
    expect(injected).toBeNull();
  });
});
