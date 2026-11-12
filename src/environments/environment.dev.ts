// Development environment (swapped in via angular.json fileReplacements for the
// `development` configuration).
// The dev server proxies /api → http://192.168.1.30:3000 via proxy.conf.json,
// so the browser only ever talks to localhost — no direct LAN route required.
// For native Capacitor builds (phone), override api_endpoint with the absolute
// homeserver URL and build without proxyConfig.
export const environment = {
  production: false,
  mode: 'Development',
  api_endpoint: '/api'
};
