import React, { Component } from 'react';
import {Image, Input,  Container, Button, List, Segment, Label} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import '../../normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';
import styles from './Details.scss';  // necessary
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router'


class Detail extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      id:this.props.match.params.id,
          name: "",
          sprite: "",  // aka, image
          type: "",
          height: 0,
          weight: 0,
          change:this.props.match.params.id,
          error:false,
	    };

    	this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    	var url = `${this.baseUrl}${this.state.id}`;

    	this.nextHandler = this.nextHandler.bind(this);
    	this.prevHandler = this.prevHandler.bind(this);
    	  
    	// GET some data back!
        
    	axios.get(url).then((response) => {
    		console.log(this.state.id);
    	   	this.setState({
                name: response.data["name"],
                sprite: response.data["sprites"]["front_default"],
                type: response.data["types"][0]["type"]["name"],
                height: response.data["height"],
                weight: response.data["weight"],
                });
    	   	console.log(url);

    	}).catch((error) => {
    	    console.log(error);
            console.log("invalid id");
            var new_id = String(Number(this.state.id)+1);
            this.setState({error:true});
            // this.props.router.push(/char/+new_id);
            // this.nextHandler();
    	});
    	
    }



	nextHandler() {
		console.log("next");
		var new_id = String(Number(this.state.id)+1);
        this.setState({
            id:new_id,
            error: false
        });
        var url = `${this.baseUrl}${new_id}`;

        // GET some data back!
        axios.get(url).then((response) => {
            this.setState({
                name: response.data["name"],
                sprite: response.data["sprites"]["front_default"],
                type: response.data["types"][0]["type"]["name"],
                height: response.data["height"],
                weight: response.data["weight"],
            });

        }).catch((error) => {
            console.log("invalid id");
            console.log(error);
            this.setState({error:true});
        });

	}

	prevHandler() {
        console.log("prev clicked");

		var new_id = String(Number(this.state.id)-1);
        this.setState({
            id:new_id,
            error: false
        });
        var url = `${this.baseUrl}${new_id}`;

        // GET some data back!
        axios.get(url).then((response) => {
            this.setState({
                name: response.data["name"],
                sprite: response.data["sprites"]["front_default"],
                type: response.data["types"][0]["type"]["name"],
                height: response.data["height"],
                weight: response.data["weight"],
            });
        }).catch((error) => {
            console.log("invalid id");
            console.log(error);
            this.setState({error:true});
        });
	}


	render() {
        var prev_id = String(Number(this.state.id)-1);
        var next_id = String(Number(this.state.id)+1);
        console.log("render  "+this.props.id);

        if (this.state.error === true){
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
                    <Segment className="char-card">
                        <Link to={'/detail/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
                        <Link to={'/detail/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
                        {/* fail to use the link below, because of handler need to [bind] */}
                        {/* <Link to={'/detail/'+ prev_id} onClick={this.clickHandler(-1)}><span className="prev" id="prev">&#10094;</span></Link>
                        <Link to={'/detail/'+ next_id} onClick={this.clickHandler(+1)}><span className="next" id="next">&#10095;</span></Link> */}
                        <h1>Invalid character ID, please click the next or prev.</h1>
                    </Segment>
                </div>
            );

        }
        else {
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
                    <Segment className="char-card">
                        <Image src={this.state.sprite} size='medium' centered />
                        <Link to={'/detail/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
                        <Link to={'/detail/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
                        <h1>{this.state.name}</h1>
                        <Label  className="label">
                            ID: {this.state.id}
                        </Label>
                        <div>Type: {this.state.type}</div>
                        <div>Height: {this.state.height}</div>
                        <div>Weight: {this.state.weight}</div>
                    </Segment>

                </div>
            );
        }

  	}
}


export default Detail