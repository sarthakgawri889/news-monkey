import React from "react";
// import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsurl, author, date, source} = props;
    return (
      <div className="my-3s">
        <div className="card">
          <div style={
            {display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0' 
          }
          }>
          <span class="badge rounded-pill bg-danger">
                {source}
              </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://cdn.ndtv.com/common/images/ogndtv.png"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
          
            <h5 className="card-title">
              {title}...{" "}
              
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
