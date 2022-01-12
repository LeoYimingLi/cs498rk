import React, { Component } from 'react';
import {Button, List, Image, Input,  Container} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles from './Gallery.scss';
import '../../normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';
import GalleryView from './GalleryView.js'
import logo from '../../logo.svg';


class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      pokemonData: []
    };
    console.log("in gallery constructor");
    
    this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';
    
    // GET some data back!
    axios.get(this.baseUrl)
    .then((response) => {

      response.data.results.map(result=>{
        axios.get(result.url)
        .then((response) => {
          this.setState({
            pokemonData: [...this.state.pokemonData, 
              {
                "id": response.data["id"], 
                "name": result.name, 
                "sprite": response.data["sprites"]["front_default"],
              }
            ],
          })
        })
        .catch((error) => {
          console.log(error);
        });


      });
    })
    
    .catch((error) => {
      console.log(error);
    });


    this.clickHandler = this.clickHandler.bind(this);
  }


  clickHandler(id) {
    let url = `https://pokeapi.co/api/v2/${id}`;
    console.log(url);
    // empty the list and GET some data back!
    this.setState({pokemonData: []});
    axios.get(url).then((response) => {
      // console.log(response);

      response.data.pokemon.slice(0, 30).map(item =>{
        var result = item.pokemon;
        axios.get(result.url)
        .then((response) => {
          this.setState({
            pokemonData: [...this.state.pokemonData, 
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


  render() {
    console.log("in gallery render");
    this.state.pokemonData.sort(function(a, b) {
      return a.id - b.id;
    });

    // make type clickers
    const types = [
      "electric", "grass", "water", "ice", "fire", "rock", "ground", "flying", 
      "psychic", "ghost", "steel", "dark", "fairy", "normal", 
      // "fighting",  "poison", "bug", 
      // "dragon",  
    ];
    const type_clickers = types.map(item=>{
      const path = `type/${item}`;
      const tag = item.slice(0,1).toUpperCase() + item.slice(1).toLowerCase();
      return(
        <a onClick={() => this.clickHandler(path)}> {tag} </a>
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

        <div className="filter">
          <span className="selectevent">Select a Type:</span>
            {type_clickers}
            {/* <a onClick={() => this.clickHandler('type/electric')}> Electric </a>
            <a onClick={() => this.clickHandler('type/grass')}> Grass </a>
            <a onClick={() => this.clickHandler('type/water')}> Water </a>
            <a onClick={() => this.clickHandler('type/fire')}> Fire </a> */}
            {/* <a onClick={() => this.clickHandler('type/rock')}> Rock </a> */}
        </div>

        <div>
          <Container className='galleryContainer'>
            <GalleryView pokemonData={this.state.pokemonData} />
          </Container>
        </div>
        </div>
    );

  }
}

export default Gallery