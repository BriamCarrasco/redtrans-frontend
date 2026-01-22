import { environment } from 'src/environments/environment';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority:
        'https://devcloudn.b2clogin.com/devcloudn.onmicrosoft.com/b2c_1_userflowdcn',
      knownAuthorities: ['devcloudn.b2clogin.com'],
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'http://localhost:4200',
      cloudDiscoveryMetadata: '',
      authorityMetadata: JSON.stringify({
        authorization_endpoint:
          'https://devcloudn.b2clogin.com/devcloudn.onmicrosoft.com/b2c_1_userflowdcn/oauth2/v2.0/authorize',
        token_endpoint:
          'https://devcloudn.b2clogin.com/devcloudn.onmicrosoft.com/b2c_1_userflowdcn/oauth2/v2.0/token',
        issuer:
          'https://devcloudn.b2clogin.com/c8103ab2-7b83-404e-a309-ee1b516cbb5a/v2.0/',
        end_session_endpoint:
          'https://devcloudn.b2clogin.com/devcloudn.onmicrosoft.com/b2c_1_userflowdcn/oauth2/v2.0/logout',
      }),
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {

    },
  });
}
