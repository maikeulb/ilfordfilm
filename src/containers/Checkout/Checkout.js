import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import styled from 'styled-components';
import { Form, Modal, Input, InputNumber, Spin } from 'antd';

const Container = styled.div `
  overflow-y: hidden;
`;

const FormItem = Form.Item;

const CreateForm = Form.create()(
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
    name: '',
    address: {
      street: '',
      city: '',
      zipCode: ''
    },
    visible: false
  }

  showModal = () => {
    this.setState({ 
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, formData) => {
      if (err) {
        return;
      }
    this.setState({
      visible: true
    });
    const order = {
      films: this.props.flms,
      price: this.props.price,
      orderData: formData
    }
    this.props.onOrderFilmCase(order);
    form.resetFields();
    this.setState({ visible: false });
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
      <CreateForm
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onCreate={this.handleCreate}
      />
    );
    let summary = <Redirect to="/" />
    if ( this.props.loading ) {
      form = <Spin />;
    }
    if ( this.props.flms ) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary = (
        <Container>
          {purchasedRedirect}
          <CheckoutSummary 
             films={this.props.flms}
             price={this.props.price}
             checkoutCancelled={this.checkoutCancelledHandler}
             checkoutContinued={this.showModal}/>
          {form}
        </Container>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
    return {
        flms: state.filmCase.films,
        price: state.filmCase.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderFilmCase: (orderData) => dispatch(actions.purchaseFilmCase(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Checkout, axios));
