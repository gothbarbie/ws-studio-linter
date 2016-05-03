'use babel';

const type = 'Error';

export default {
  activate() {
    console.log('My package was activated');
  },

  deactivate() {
    console.log('My package was deactivated');
  },

  provideLinter() {
    const validate = require( 'ad-validator' );

    const provider = {
      name: 'ad-validator',
      grammarScopes: [ 'text.html.basic' ],
      scope: 'file',
      lintOnFly: false,

      lint( textEditor ) {
        const filePath = textEditor.getPath();

        return validate.html( textEditor.getText() ).map( error => {
          const { message: text, start, end } = error;

          const range = [
            [ start.line, start.column ],
            [ end.line, end.column ],
          ];

          return { type, text, range, filePath };
        });
      }
    }

    return provider;
  }
};
