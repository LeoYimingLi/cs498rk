import React, { Component } from 'react';
import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles from './Search.scss';
import ListView from '../List/List.js';
import '../../normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';


class App extends Component {

  constructor() {
    super();
    this.state = {
      filter: '',  // user input in search bar
      selectedType:"type/electric", // and different types
      selectedOrder:"Id-Ascending",
      rawData: [],  // fetch from the axios, not sort and filter
      processedData: [] // ready to shown in List.js after filtering and sorting
    };

    this.baseUrl = `https://pokeapi.co/api/v2/`;
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleTypeChange= this.handleTypeChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    
    // initialized and let the data show
    this.clickHandler("type/electric");
    
  }

  clickHandler(option) {
    // Form the URL
    this.setState({rawData: []});
    let url = `${this.baseUrl}${option}`;
    console.log("in clickhandler");
    console.log(url);

    // GET some data back!
    axios.get(url).then((response) => {
      // console.log(response);

      response.data.pokemon.slice(0, 40).map(item =>{
        var result = item.pokemon;
        
        axios.get(result.url)
        .then((response) => {
          this.setState({
            rawData: [...this.state.rawData, 
              {"id": response.data["id"], 
              "name": result.name, 
              "sprite": response.data["sprites"]["front_default"]}
            ],
          })
        })

        .catch((error) => {
          console.log(error);
        });
      });

    }).catch((error) => {
      console.log(error);
    });
  }

  inputChangeHandler(event) {
    this.setState({ filter: event.target.value});

  }

  handleTypeChange(event){
    this.setState({ selectedType: event.target.value});
    this.clickHandler(event.target.value);  // update in real time
  }

  handleOrderChange(event){
    this.setState({ selectedOrder: event.target.value});
  }

  render() {
    console.log("in render");
    //1.filter the "cached" data, no need to fetch from api; only call api when type is changed
    this.state.processedData = this.state.rawData;
    if (this.state.filter !== "") {
      this.state.processedData = [];
      var reg = eval("/^" + this.state.filter + ".*/");
      // var reg = eval("/^" + this.state.filter + ".+/");  // can not use + here, otherwise can not exact-locate a name
      for (const item of this.state.rawData) {
        if (item.name.match(reg)) {
          this.state.processedData.push(item);
        }
      }
    }


    // 2.sorting
    if(this.state.selectedOrder === "Id-Ascending"){
      this.state.processedData.sort(function(a, b) {
      return a.id - b.id;
      });
    } else if (this.state.selectedOrder === "Name-Ascending") {
      this.state.processedData.sort(function(a,b){return a.name.localeCompare(b.name)});
    } else if (this.state.selectedOrder === "Name-Descending"){
      this.state.processedData.sort(function(a,b){return -a.name.localeCompare(b.name)});
    }
    
    
    // make type checkboxes
    const types = [
      "electric", "grass", "water", "ice", "fire", "rock", "psychic", 
      // "fighting", "flying", "poison", "ground", "bug", "ghost", "steel", 
      // "dragon", "dark", "fairy", "normal", 
    ];
    const type_checkboxes = types.map(item=>{
      const path = `type/${item}`;
      // console.log(path);
      return(
        <span className="radioinput">
          <label><input
            type="radio"
            value={path}
            className="form-check-input"
            checked={this.state.selectedType === path}
            onChange={this.handleTypeChange}
            />
            {item.slice(0,1).toUpperCase() + item.slice(1).toLowerCase()}
          </label>
        </span>
        )
    });


    // make order checkboxes
    const orders = ["Id-Ascending", "Name-Ascending", "Name-Descending"];
    const order_checkboxes = orders.map(item=>{
      return(
        <span className="radioinput">
          <label><input
            type="radio"
            value={item}
            className="form-check-input"
            checked={this.state.selectedOrder === item}
            onChange={this.handleOrderChange}
            />
            {item}
          </label>
        </span>
        )
    });



    return (
      <div>
        <div className="navbar" id="navbar">
          {/* <Image src="../../../assets/pokemon.jpg"  className='center'/> */}
          <Image src="https://logos-download.com/wp-content/uploads/2016/07/Pok%C3%A9mon_Go_logo.png" className='center'/>
        </div>

        <div className="menu">
            <Link to="/">Search</Link>
            <Link to="/gallery">Gallery</Link>
        </div>

        <div className="searchbar">
          <Input
            onChange={this.inputChangeHandler}
            placeholder='Search a Pokémon here'
            value={this.state.value}
            className="searchbar_input"
          />
          {/* no need to add clickhandler to the button now since it will update in real time :) */}
          {/* <Button className='button' onClick={this.clickHandler}> Search </Button> */}
          <Button className='button'> Search </Button>
        </div>


        <div className='radiodiv'>
          <form>
              Type:
              {/* electric, grass, water, fire, rock */}
              {type_checkboxes}
              {/* actually we can use a function to generate this similar structure, and saved as a variable */}
            </form>

            <form>
              Order:
              {order_checkboxes}
            </form>
        </div>


        <div>
          <Container className='listContainer'>
              {/* <ListView rawData={this.state.rawData} /> */}
              <ListView processedData={this.state.processedData} />
          </Container>
        </div>
      

      </div>
    );
  }
}

export default App;