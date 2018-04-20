import React, {
  Component
} from 'react';

import axios from '../../../axios-orders';
import styled from 'styled-components';
import {
  Button,
  Spin
} from 'antd';

const ContactContainer = styled.div `
    margin: 20px auto;
    width: 80%;
    text-align: center;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;
`;

const InputContainer = styled.div `
    display: block;
`;

class Contact extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
  }

  render() {
    let form = (
      <form>
              <InputContainer><input type="text" name="name" placeholder="Your Name" /></InputContainer>
              <InputContainer><input type="email" name="email" placeholder="Your Mail" /></InputContainer>
              <InputContainer><input type="text" name="street" placeholder="Street" /></InputContainer>
              <InputContainer><input type="text" name="postal" placeholder="Postal Code" /></InputContainer>
              <InputContainer><Button type="primary" onClic={this.orderHandler}>ORDER</Button></InputContainer>
            </form>
    );
    if (this.state.loading) {
      form = <Spin />;
    }
    return (
      <ContactContainer>
                <h4>Enter your Contact Information</h4>
                {form}
              </ContactContainer>
    );
  }
}

export default Contact;
