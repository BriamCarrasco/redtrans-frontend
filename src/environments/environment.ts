export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'f41b21c5-8249-4630-984d-6fb203578736',
      authority:
        'https://devcloudn.b2clogin.com/devcloudn.onmicrosoft.com/b2c_1_userflowdcn',
    },
  },
  apiConfig: {
    scopes: ['openid', 'offline_access'],
    uri: 'http://localhost:4200',
  },
};
