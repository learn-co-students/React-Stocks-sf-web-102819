import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
      portfolioStocks: [],
      filteredStocks: []
    };
  }

  fetchStocks = async () => {
    const response = await fetch("http://localhost:3000/stocks");
    const apiData = await response.json();
    // console.log(apiData);
    this.setState({
      stocks: apiData,
      filteredStocks: apiData
    });
  };

  componentDidMount() {
    this.fetchStocks();
  }

  addStock = (event, stock) => {
    let isStockInPortfolio = this.state.portfolioStocks.find(
      element => element.id == stock.id
    );
    if (isStockInPortfolio == undefined) {
      this.setState(
        {
          portfolioStocks: [...this.state.portfolioStocks, stock]
        },
        () => console.log(this.state.portfolioStocks)
      );
    }
  };

  removeStock = (event, stock) => {
    // i filter thru portfolioStocks and output all the values except for our stock
    // and then set state with that new array
    let filteredArray = this.state.portfolioStocks.filter(
      element => element.id !== stock.id
    );
    this.setState({
      portfolioStocks: filteredArray
    });
  };

  handleAlphabetically = event => {
    let sortedStocks = this.state.stocks.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.setState({
      stocks: sortedStocks
    });
  };

  handlePrice = event => {
    let sortedPrice = this.state.stocks.sort((a, b) => a.price - b.price);
    this.setState({
      stocks: sortedPrice
    });
  };

  handleFilter = event => {
    if (event.target.value !== "All") {
      let filteredStocks = this.state.stocks.filter(element => element.type === event.target.value);
      console.log(filteredStocks)
      this.setState({
        // stocks: [...this.state.filtered, filteredStocks]
        filteredStocks: filteredStocks
      });
    } else {
      this.setState({
        filteredStocks: this.state.stocks
      });
    }
  };

  render() {
    return (
      <div>
        <SearchBar
          handleAlphabetically={this.handleAlphabetically}
          handlePrice={this.handlePrice}
          handleFilter={this.handleFilter}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              allStocks={this.state.filteredStocks}
              addStock={this.addStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolioStocks={this.state.portfolioStocks}
              removeStock={this.removeStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
