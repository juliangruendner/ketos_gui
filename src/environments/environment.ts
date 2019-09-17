// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  demo: false,
  version: '(dev)',
  serverUrl: 'http://localhost:5000',   //'https://ketos.ai/api',
  //serverUrl: 'https://ketos.ai/api',
  fhirServerUrl: 'http://46.101.216.15:8080/gtfhir/base/',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ]
};
