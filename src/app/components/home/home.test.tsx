import * as React from 'react';
import {mount} from 'enzyme';

import HomeComponent from './home.component';

describe('HomeComponent', (): void => {
  it('should display HELLO_WORD', (): void => {
    const component = mount(<HomeComponent/>);
    // verify it has HELLO WORLD
    // HELLO_WORLD is not translated as we have mocked the i18n library
    expect(component.find('h3').text()).toEqual('HELLO_WORD');
    expect(mount).toMatchSnapshot();
  });
});
