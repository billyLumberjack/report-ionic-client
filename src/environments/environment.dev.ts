// Development environment (swapped in via angular.json fileReplacements for the
// `development` configuration). For a dev build pointed at a different host, set
// an absolute URL here, e.g. 'http://skiapp.traverna.home/api'.
export const environment = {
  production: false,
  mode: 'Development',
  // Absolute URL so the native (Capacitor) build can reach report-api directly
  // from the phone. The web/nginx build uses the same-origin '/api' in
  // environment.ts instead.
  api_endpoint: 'http://192.168.1.30:3000'
};
