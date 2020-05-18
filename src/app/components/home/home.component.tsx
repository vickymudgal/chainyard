import * as React from 'react';
import { Input, Form, FormGroup, Button, Row, Col, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { AppProps, DependencyInjector, ComponentViewState } from '@helpers';

import { HomeState } from './home.state';

import './home.styles.css';

class HomeComponent extends React.Component<AppProps, HomeState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hash: "",
      singleBlock: undefined,
      componentState: ComponentViewState.DEFAULT,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    switch (e.target.id) {
      case 'hash':
        this.setState({ hash: e.target.value });
        break;
    }
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const { hash } = this.state;
    if (hash) {
      this.setState({ componentState: ComponentViewState.LOADING });
      const singleBlock = await this.props.blockService.getBlock(this.state.hash);
      if (singleBlock.hasData()) {
        this.setState({ componentState: ComponentViewState.LOADED, singleBlock: singleBlock.data });
      } else {
        this.setState({ componentState: ComponentViewState.ERROR, error: singleBlock.error });
      }
    }
  }

  render(): React.ReactNode {
    const { singleBlock, componentState, error } = this.state;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;

    return (
      <div className="container">
        <Form>
          <FormGroup>
            <Input type="text" name="hash" id="hash" placeholder="Enter the hash code to get Single Block" onChange={this.handleChange} />
          </FormGroup>
          <Button onClick={this.handleSubmit} disabled={componentState === ComponentViewState.LOADING}>Submit</Button>
        </Form>
        {
          isLoading &&
          <FontAwesomeIcon icon={faSpinner} spin />
        }
        {
          isError &&
          <Alert color="danger">{error}</Alert>
        }
        {singleBlock && isLoaded &&
          <div className="content">
            <Row>
              <Col>Hash</Col>
              <Col>{singleBlock.hash}</Col>
            </Row>
            <hr />
            <Row>
              <Col>TimeStamp</Col>
              <Col>{singleBlock.time}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Bits</Col>
              <Col>{singleBlock.bits}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Fee</Col>
              <Col>{singleBlock.fee}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Nonce</Col>
              <Col>{singleBlock.nonce}</Col>
            </Row>
            <hr />
            <Row>
              <Col>N_Tx</Col>
              <Col>{singleBlock.nTx}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Size</Col>
              <Col>{singleBlock.size}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Main chain</Col>
              <Col>{singleBlock.mainChain}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Height</Col>
              <Col>{singleBlock.height}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Weight</Col>
              <Col>{singleBlock.weight}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Block Index</Col>
              <Col>{singleBlock.blockIndex}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Nonce</Col>
              <Col>{singleBlock.nonce}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Previous Block</Col>
              <Col>{singleBlock.prevBlock}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Mrkl root</Col>
              <Col>{singleBlock.mrklRoot}</Col>
            </Row>
            <h2> Transactions </h2>
            {
              singleBlock.tx.transactions.map((data): React.ReactNode => {
                return (<Link  key={data.hash} to={'/transaction/'+data.hash}><Row>
                  {data.hash}
                </Row>
                <hr/>
                </Link>);
              })
            }
          </div>
        }
      </div>
    );
  }
}

export default DependencyInjector(HomeComponent);
