import React, {
  Component
} from 'react';

import axios from '../../../axios-orders';
import styled from 'styled-components';
import { Form, Modal, Radio, Input, Button, Spin } from 'antd';

const ContactContainer = styled.div `
    margin: 20px auto;
    width: 80%;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
`;

const ButtonContainer = styled.div `
    padding: 20px;
`;

const InputContainer = styled.div `
    display: block;
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


class Contact extends Component {
  state = {
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

  // orderHandler = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     loading: true
  //     visible: true
  //   });
  //   const order = {
  //     films: this.props.films,
  //     price: this.props.price,
  //     customer: {
  //       name: 'Mike Barnes',
  //       address: {
  //         street: '123 Main St',
  //         zipCode: '11011',
  //         country: 'USA'
  //       },
  //       email: 'demo@example.com'
  //     },
  //     deliveryMethod: 'express'
  //   }
  //   axios.post('/orders.json', order)
  //     .then(response => {
  //       this.setState({
  //         loading: false
  //       });
  //       this.props.history.push('/');
  //     })
  //     .catch(error => {
  //       this.setState({
  //         loading: false
  //       });
  //     });
  // }



  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

  console.log('Received values of form: ', values);
  form.resetFields();
  this.setState({ visible: false });
      });
    }
    saveFormRef = (formRef) => {
      this.formRef = formRef;
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
        <div>
          <Button type="primary" onClick={this.showModal}>ORDER</Button>
          {form}
        </div>
      );
    }
  }

  // render() {
  //   let form = (
  //     <form>
  //       <InputContainer><input type="text" name="name" placeholder="Your Name" /></InputContainer>
  //       <InputContainer><input type="email" name="email" placeholder="Your Mail" /></InputContainer>
  //       <InputContainer><input type="text" name="street" placeholder="Street" /></InputContainer>
  //       <InputContainer><input type="text" name="postal" placeholder="Postal Code" /></InputContainer>
  //       <InputContainer>
  //       <ButtonContainer>
  //         <Button type="primary" onClick={this.orderHandler}>ORDER</Button>
  //       </ButtonContainer>
  //       </InputContainer>
  //     </form>
  //   );
  //   if (this.state.loading) {
  //     form = <Spin />;
  //   }
  //   return (
  //     <ContactContainer>
  //         <h4>Enter your Contact Information</h4>
  //         {form}
  //     </ContactContainer>
  //   );
  // }
// }

export default Contact;
