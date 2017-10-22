
var test = require( 'unit.js' );
const util = require( 'util' );

import { ChtrForm } from '../build/chtr-form.js';
import { React } from 'react';
import { ChtFormElements, ChtrFormCss } from '../build/chtr-form-elements.js';

describe( 'Basic Data Build', function () {
  it('Make sure the object was exported!', function () {
    test.assert(ChtFormElements.constructor==Object);
  });

  it('make sure we loaded some plugins', function () {
    let count=0;
    for( let key in ChtFormElements) {
      if(ChtFormElements.hasOwnProperty(key)) { ++count; }
    }
    test.assert(count!=0);

  });
});

