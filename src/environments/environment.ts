// Production environment (default build). Served by the same nginx that proxies
// /api -> report-api, so a same-origin relative path works over LAN, VPN or any
// hostname (no cloud URL to maintain).
export const environment = {
  production: true,
  mode: 'Production',
  api_endpoint: '/api'
};
