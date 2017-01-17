// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// Here configured dependency to running backend services

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000', 
  baseTag: 'items',
  clientIdHeader: 'x-ibm-client-id',
  clientIdDefault: 'default',
  clientSecretHeader: 'x-ibm-client-secret',
  clientSecretDefault: 'SECRET'
};
