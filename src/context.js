import React, {Component} from "react";
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider Consumer

class ProductProvider extends Component {
    state = {
        products: storeProducts,
        detailProduct: detailProduct,
        cart:[],
        modalOpen: true,
        modalProduct: detailProduct,

    };
    componentDidMount(){
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return {products: tempProducts};
        });
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct: product}
        })
    };

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
            
            return {products: tempProducts, cart:[...this.state.cart, product]};
        },
         () => {
             console.log(this.state);
         }
        );

    };

    tester = () => {
        console.log('State products :', this.state.products[0].inCart);
        console.log('Data products :', storeProducts[0].inCart);

        const tempProducts = [...this.state.products];
        tempProducts[0].inCart = true;
        this.setState(() => {
            return {products: tempProducts}
        }, () => {
            console.log('State products :', this.state.products[0].inCart);
            console.log('Data products :', storeProducts[0].inCart);
        })
    }
    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=> {
            return {modalProduct: product, modalOpen:true}
        })
    }

    closeModal = () => {
        this.setState(()=>{
            return {modalOpen:false}
        })
    }

    render() {
        return (
            <ProductContext.Provider
                value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal
            }}>

                <button test onClick={this.tester}>test me</button>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
