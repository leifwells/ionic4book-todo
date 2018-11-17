// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB6C6JDo8n0dg9lG1H3-rz1DuIr_AcAe8U',
    authDomain: 'ionic2do-5b82b.firebaseapp.com',
    databaseURL: 'https://ionic2do-5b82b.firebaseio.com',
    projectId: 'ionic2do-5b82b',
    storageBucket: 'ionic2do-5b82b.appspot.com',
    messagingSenderId: '583778457575'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
