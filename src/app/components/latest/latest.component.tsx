import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';

import {AppProps, DependencyInjector} from '@helpers';
import {ComponentViewState} from '@helpers';
import {LatestState} from './latest.state';

import './latest.styles.css';

class LatestComponent extends React.Component<AppProps, LatestState>{
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hash: '',
      componentState: ComponentViewState.DEFAULT,
    }
    this.fetch = this.fetch.bind(this);
  }

  async fetch(): Promise<void> {
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await this.props.blockService.getLatestBlock();
    if (response.hasData()
      && response.data) {
      this.setState({
        componentState: ComponentViewState.LOADED,
        block: response.data
      });
    } else {
      //const msg = response.error || this.translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: response.error,
      });
    }
  }
  async componentDidMount(): Promise<void> {
    this.fetch();
  }

  render(): React.ReactNode {
    const {componentState, block, error} = this.state;
    // const {translation} = this.props;

    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;
    const isLoaded = componentState === ComponentViewState.LOADED;

    return (
      <div  className="container">
        <h3>
          Latest Block
        </h3>
        <br/><br/>
        {
          isLoading && <FontAwesomeIcon icon={faSpinner} spin />
        }
        {
          isError &&
          <div> {error} </div>
        }
        {block && isLoaded &&
          <div className="content">
            <Row>
              <Col>Hash</Col>
              <Col>{block.hash}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Time</Col>
              <Col>{block.time}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Block Index</Col>
              <Col>{block.blockIndex}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Height</Col>
              <Col>{block.height}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Height</Col>
              <Col>{...block.txIndexes}</Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default DependencyInjector(LatestComponent);
