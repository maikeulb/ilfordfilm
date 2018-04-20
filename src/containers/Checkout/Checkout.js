import React, {
  Component
} from 'react';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import styled from 'styled-components';
import { Form, Modal, Input, InputNumber, Spin } from 'antd';

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
          title="Shipping Address"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter your name!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Address">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please enter your address!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="City">
              {getFieldDecorator('city', {
                rules: [{ required: true, message: 'Please enter your city!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="ZipCode">
              {getFieldDecorator('zipCode', {
                rules: [
                  { required: true, message: 'Please enter a valid zipcode!' }
                ],
              })(
                <InputNumber />
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
    address: {
      street: '',
      city: '',
      zipCode: ''
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
    console.log(values)
    this.setState({
      loading: true,
      visible: true
    });
    const order = {
      films: this.state.films,
      price: this.state.totalPrice,
      orderData: values
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

export default Checkout;
