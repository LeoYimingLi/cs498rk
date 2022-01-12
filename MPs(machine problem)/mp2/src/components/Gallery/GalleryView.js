import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Image, Card } from 'semantic-ui-react'
import styles from './GalleryView.scss'
import { Link } from 'react-router-dom';


class GalleryView extends Component {
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   pokemonData: []
    // };
  // }
  render() {

    const characters_view = (this.props.pokemonData || []).map(item=>{
      var detailView = `/detail/${item["id"]}`;
      return(
          <Grid.Column key={item["id"]}>
          {/* <Grid.Column> */}
            <Link to={detailView}>
            <div>
              <Card className="noCharacter">
                <Image src={item["sprite"]} />
              </Card>
              <div>{item["name"]}</div>
            </div>
            </Link>
          </Grid.Column>
        )
      });


    // Display some data about the Pokemon, and its abilities.
    return (
      <Grid container columns={3}>
        {characters_view}
      </Grid>
    )

  }
}

GalleryView.propTypes = {
  pokemonData: PropTypes.array,
}

export default GalleryView