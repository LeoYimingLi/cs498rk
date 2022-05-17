import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Label, List, Image } from 'semantic-ui-react'
import styles from './List.scss'
import { Link } from 'react-router-dom';


class ListView extends Component {
  render() {
    const characters_view = (this.props.processedData || []).map(item=>{
      var detailView = `/detail/${item["id"]}`;
      return(
        <li className="w3-bar" key={item["id"]}>
            <Link to={detailView} className="listrow">
              <div className="bar-contnet">
              <div className="avatar">
                <Image src={item["sprite"]} avatar />
                <span className='character_name'>{item["name"]}</span>
              </div>
            </div>
            </Link>
        </li>
      )
    });

    // Display some data about the Pokemon, and its abilities.
    return (
        <ul className="w3-ul w3-card-4">
          {characters_view}
        </ul>
    )

  }
}


ListView.propTypes = {
  processedData: PropTypes.array,
};

export default ListView