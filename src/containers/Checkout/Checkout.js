import React, {
  Component
} from 'react';
import {
  Route
} from 'react-router-dom';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import styled from 'styled-components';
import { Form, Modal, Radio, Input, Button, Spin } from 'antd';

const Container = styled.div `
  overflow-y: hidden;
`;

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);


class Checkout extends Component {

  state = {
    films: null,
    price: 0,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    visible: false
  }

  showModal = () => {
    this.setState({ 
      visible: true,
      loading: false,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
    this.setState({
      loading: true,
      visible: true
    });
    const order = {
      films: this.state.films,
      price: this.state.totalPrice,
      customer: {
        name: 'Mike Barnes',
        address: {
          street: '123 Main St',
          zipCode: '11011',
          country: 'USA'
        },
        email: 'demo@example.com'
      },
      deliveryMethod: 'express'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
    form.resetFields();
    this.setState({ visible: true });
      });
    }


  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const films = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        films[param[0]] = +param[1];
      }
    }
    this.setState({
      films: films,
      totalPrice: price
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  // checkoutContinuedHandler = () => {
  //   this.props.history.replace('/checkout/contact');
  // }

  render() {
    let form = (
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
    );
    if (this.state.loading) {
      form = <Spin />;
    }
    return (
      <Container>
        <CheckoutSummary 
           films={this.state.films}
           checkoutCancelled={this.checkoutCancelledHandler}
           checkoutContinued={this.showModal}/>
        {form}
      </Container>
    );
  }
}

  // render() {
  //   return (
  //     <Container>
  //       <CheckoutSummary 
  //          films={this.state.films}
  //          checkoutCancelled={this.checkoutCancelledHandler}
  //          checkoutContinued={this.checkoutContinuedHandler}/>
  //       // <Route 
  //          // path={this.props.match.path + '/contact'} 
  //          // render={(props) => (<Contact films={this.state.films} price={this.state.totalPrice} {...props} />)} />
  //     // </Container>
  //   // );
  // // }
// // }

export default Checkout;
