import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ReportProvider } from './report';
import { environment } from '../../environments/environment';

// Guard test for CVE-2025-66035: XSRF Token Leakage via protocol-relative URLs.
// The Angular HTTP client leaked the XSRF token when requests used protocol-relative
// URLs (e.g. "//example.com/api"). This app never uses protocol-relative URLs, so
// the vulnerability has no direct impact, but this test documents and locks that fact.
describe('ReportProvider (XSRF guard — CVE-2025-66035)', () => {
  let provider: ReportProvider;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReportProvider,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    provider = TestBed.inject(ReportProvider);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('creates the provider', () => {
    expect(provider).toBeTruthy();
  });

  it('api_endpoint is not a protocol-relative URL', () => {
    // Protocol-relative URLs start with "//" and were the attack vector in CVE-2025-66035.
    expect(environment.api_endpoint.startsWith('//')).toBe(false);
  });

  it('getReports uses the configured api_endpoint (not a cross-origin URL)', () => {
    provider.getReports({}).subscribe();
    const req = httpController.expectOne(r => r.url.startsWith(environment.api_endpoint));
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
