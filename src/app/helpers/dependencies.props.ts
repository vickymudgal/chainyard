
import {BlockService} from '@services';
import i18next from 'i18next';
import {RouteComponentProps} from 'react-router';

export interface AppDependenciesProps {
  blockService: BlockService;
  translation: i18next.i18n;
}

export interface AppProps extends RouteComponentProps, AppDependenciesProps {
}
