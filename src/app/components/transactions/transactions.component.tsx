import * as React from 'react';

import {AppProps, DependencyInjector} from '@helpers';
import { Row, Col, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import {ComponentViewState} from '@helpers';
import {TransactionsState} from './transactions.state';

import './transactions.styles.css';

class TransactionsComponent extends React.Component<AppProps, TransactionsState>{
  constructor(props: AppProps) {
    super(props);
    this.state = {
      txHash: '',
      componentState: ComponentViewState.DEFAULT,
    }
    this.getTransaction = this.getTransaction.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const path  = this.props.location.pathname;
    const id  = path.substring(path.lastIndexOf("/") + 1);
    await this.getTransaction(id);
  }

  async getTransaction(id: string): Promise<void> {
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await this.props.blockService.getTransaction(id);
    if (response.hasData()) {
      this.setState({
        componentState: ComponentViewState.LOADED,
        transaction: response.data,
      });
    } else {
      //const msg = response.error || this.translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: response.error,
      });
    }
  }
  
  render(): React.ReactNode {
    const {componentState, transaction, error} = this.state;

    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;
    // const { translation } = this.props;
    return (
      <div className="container">
        {
          isLoading &&
          <FontAwesomeIcon icon={faSpinner} spin />
        }
        {
          isError &&
          <Alert color="danger">{error}</Alert>
        }
        {transaction && isLoaded &&
          <div className="content">
            <Row>
              <Col>Hash</Col>
              <Col>{transaction.hash}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Ver</Col>
              <Col>{transaction.ver}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Fee</Col>
              <Col>{transaction.fee}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Vin Sz</Col>
              <Col>{transaction.vinSz}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Vout Sz</Col>
              <Col>{transaction.voutSz}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Lock time</Col>
              <Col>{transaction.lockTime}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Tx Index</Col>
              <Col>{transaction.txIndex}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Double Spend</Col>
              <Col>{transaction.doubleSpend}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Result</Col>
              <Col>{transaction.result}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Weight</Col>
              <Col>{transaction.weight}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Balance</Col>
              <Col>{transaction.balance}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Time</Col>
              <Col>{transaction.time}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Block Index</Col>
              <Col>{transaction.blockIndex}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>Block Height</Col>
              <Col>{transaction.blockHeight}</Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default DependencyInjector(TransactionsComponent);
