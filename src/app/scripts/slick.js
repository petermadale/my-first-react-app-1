import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className="slick-arrow slick-next fa"
      style={{ ...style }}
      onClick={onClick}
    >
      Next
    </button>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className="slick-arrow slick-prev fa"
      style={{ ...style }}
      onClick={onClick}
    >
      Prev
    </button>
  );
}

class ReactSlick extends Component {
  render() {
    const { items } = this.props;
    var settings = {
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="mr-4">
        <Slider {...settings}>
          {items.map((i) => (
            <div key={i.id}>
              {i.address1} {i.address2} {i.city} {i.state} {i.zip}
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default ReactSlick;
