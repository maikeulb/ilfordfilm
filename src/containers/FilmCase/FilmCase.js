import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Film from '../../components/Film/Film';
import Controls from '../../components/Film/Controls/Controls';
import { Modal, Button } from 'antd';

import styled from 'styled-components';

const FILM_PRICES = {
    panf: 4.5,
    delta100: 4.0,
    hp5: 5.5,
    delta3200: 8.0
};

class FilmCase extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    state = {
        films: {
            panf: 0,
            delta100: 0,
            hp5: 0,
            delta3200: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        visible: false
    }

    updatePurchaseState (films) {
        const sum = Object.keys( films)
            .map( filmKey => {
                return films[filmKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addFilmHandler = ( type ) => {
        const oldCount = this.state.films[type];
        const updatedCount = oldCount + 1;
        const updatedFilms= {
            ...this.state.films
        };
        updatedFilms[type] = updatedCount;
        const priceAddition = FILM_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, films: updatedFilms} );
        this.updatePurchaseState(updatedFilms);
    }

    removeFilmHandler = ( type ) => {
        const oldCount = this.state.films[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedFilms= {
            ...this.state.films
        };
        updatedFilms[type] = updatedCount;
        const priceDeduction = FILM_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, films: updatedFilms} );
        this.updatePurchaseState(updatedFilms);
    }

    render () {
        const disabledInfo = {
            ...this.state.films
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
              <Modal 
                Title = "Your Order"
                visible={this.state.purchasing}
                onOk={this.purchaseContinueHandler}
                onCancel={this.purchaseCancelHandler}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>

                <Film films ={this.state.films} />
                <Controls
                    filmAdded={this.addFilmHandler}
                    filmRemoved={this.removeFilmHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />

            </Aux>
        );
    }
}

export default FilmCase;
