import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterByValue, loadData, sortByAlphabet,sortByOpenClose} from "./store";
import ReactCardFlip from 'react-card-flip';
class App extends Component {
    constructor() {
        super();
          this.state = {
          isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      }
    componentDidMount() {
        this.props.dispatch(loadData());
    }

    filterByInput(e){
        let input = e.target.value;
        this.props.dispatch(filterByValue({value: input}))
    }

    sortByInput(e){
        let value = e.target.value;
        
        if(value.endsWith('asc') || value.endsWith('desc')){
            let direction = value.endsWith('asc') ? "asc" : "desc";
            this.props.dispatch(sortByAlphabet({direction}));
        }
        else{
            this.props.dispatch(sortByOpenClose({value: value}));
        }
    }

    render() {
        let products = this.props.state.filteredProducts;
        return (
            <div className="App">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Shopping Windows
                            </h1>
                        </div>
                    </div>
                </section>

                <section className='section'>
                    <div className='container'>
                        <div>
                            <div className="field is-grouped" style={{alignItems: "center"}}>
                                <div className="control">
                                    <div className="select mb-3">
                                        <select onChange={e => {
                                            this.sortByInput(e)
                                        }}>
                                            <option value="" disabled selected>Sort by</option>
                                            <option value='alphabet_asc'>Category - A-Z</option>
                                            <option value='alphabet_desc'>Category - Z-A</option>
                                            <option value='On'>Open Windows</option>
                                            <option value='Off'>Close Windows</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='control mb-3' style={{minWidth: "300px"}}>
                                    <input onChange={e => {
                                        this.filterByInput(e);
                                    }} style={{width: "100%"}} placeholder='Filter by category and shopping window' type='text'/>
                                </div>
                            </div>
                        </div>
                        
                        <div className='tile is-ancestor' style={{flexWrap: "wrap"}}>
                            {
                                products && products.length && products.map(product => (
                                    
                                    <div className='tile is-parent is-3'>
                                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                                    <div className="card" style={{minWidth: "18rem;",minHeight:"15rem"}}>
                                        <div className="card-header">
                                            <b>Category: &nbsp;</b>{product.category}
                                        </div>
                                        <div className="card-body">
                                        <h5 className="card-title"><b>Shopping window: &nbsp;</b>{product.shoppingWindow}</h5>
                                            <p className="card-text"><b>Accessories: &nbsp;</b>{product.accessories} Accessories</p>
                                            <p className="card-text"><b>Current Status: &nbsp;</b>{product.openClose}</p>
                                            <button className="btn btn-primary mt-2"  onClick={this.handleClick}>View</button>
                                        </div>
                                    </div>

                                    <div className="card" style={{minWidth: "18rem;",minHeight:"15rem"}}>
                                        <div className="card-header">
                                                <b>Category: &nbsp;</b>{product.category}
                                        </div>
                                        <img
                                            src={
                                                product.imageUrl
                                                ? product.imageUrl
                                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHwn0qRb1jaZpsvDZXQE0De1xDNwQJjBOAg&usqp=CAU'
                                            }
                                            className='card-img-top'
                                            alt='...'
                                        />                                        
                                        <div className="card-body">
                                            <button className="btn btn-primary mt-2"  onClick={this.handleClick}>View</button>
                                        </div>
                                    </div>
                                    </ReactCardFlip>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps)(App);
