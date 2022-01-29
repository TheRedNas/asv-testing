/**
 * This file contains authentication parameters.
 * These parameters are used to initialize Angular and MSAL Angular configurations
 * in the app.module.ts file.
 */

import {LogLevel, Configuration, BrowserCacheLocation} from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Azure Active Directory (Azure AD) user flows and policies.
 */
export const b2cPolicies = {
  names: {
    signIn: "B2C_1_signin",
    editProfile: "B2C_1_edit_profile",
    resetPassword: "B2C_1_reset_password",
  },
  authorities: {
    signIn: {
      authority: "https://freeboardnl.b2clogin.com/freeboardnl.onmicrosoft.com/B2C_1_signin",
    },
    editProfile: {
      authority: "https://freeboardnl.b2clogin.com/freeboardnl.onmicrosoft.com/B2C_1_edit_profile",
    },
    resetPassword: {
      authority: "https://freeboardnl.b2clogin.com/freeboardnl.onmicrosoft.com/B2C_1_reset_password",
    }
  },
  authorityDomain: "freeboardnl.b2clogin.com",
  extensionPrefix: "extension_e3e3770b8d1645428529d235ba3dd302_",
  issuer: "freeboardnl.onmicrosoft.com"
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: 'ae5d3645-1c7f-433d-8a0a-bc86db444db2',
    authority: b2cPolicies.authorities.signIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: isIE,
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel, message, containsPii) => {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}

export const OAuthSettings = {
  appId: "ae5d3645-1c7f-433d-8a0a-bc86db444db2",
  redirectUri: "http://localhost:4200",
  scopes: ["User.ReadWrite.All"]
}

/**
 * The endpoint and scopes for the backend.
 */
export const protectedResources = {
  freeboardApi: {
    endpoint: "<put-endpoint-here>",
    scopes: ["https://freeboardnl.onmicrosoft.com/auth-api/auth.read", "https://freeboardnl.onmicrosoft.com/auth-api/auth.write"],
  },
}

/**
 * Properties for the login request.
 */
export const loginRequest = {
  scopes: []
};
