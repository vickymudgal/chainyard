import * as React from 'react';
import i18next from 'i18next';

import {BlockServiceImpl, BlockService} from '@services';
import {AppDependenciesProps, AppProps, i18n} from '@helpers';

// init dependencies
const blockService: BlockService = new BlockServiceImpl();
const translation: i18next.i18n = i18n;

const DependencyInjector = <P extends AppProps>(
  Component: React.ComponentType<P>
): typeof React.Component =>
  class Injector extends React.Component<P, AppProps> {
    constructor(props: any) {
      super(props);
    }

    getDependencies(): AppDependenciesProps {
      return {
        blockService,
        translation,
      };
    }
    render(): React.ReactNode {
      // injecting dependencies in components from here
      const dependencies = this.getDependencies();
      return (
        <Component {...this.props} {...dependencies} />
      );
    }
  };

export default DependencyInjector;
