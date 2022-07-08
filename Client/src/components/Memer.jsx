import React, { useState } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import testiImage1 from "../assets/images/resources/testi-1-1.png";

const memers = [
    {
        followers : '16.8 Million',
        posts : '12,303',
        likes : 'appx. 1.2B',
        name : '@epicfunnypage',
        platform : 'Instagram',
        img : testiImage1
    },
    {
        followers : '16.1 Million',
        posts : '2,472',
        likes : 'appx. 2.49B',
        name : '@fuckjerry',
        platform : 'Instagram',
        img : testiImage1
    },
    {
        followers : '16.8 Million',
        posts : '12,303',
        likes : 'appx. 1.2B',
        name : '@epicfunnypage',
        platform : 'Instagram',
        img : testiImage1
    },
    {
        followers : '16.1 Million',
        posts : '2,472',
        likes : 'appx. 2.49B',
        name : '@fuckjerry',
        platform : 'Instagram',
        img : testiImage1
    },
]

export default function Memers() {
  const [swiper, setSwiper] = useState(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  return (
    <section className="testimonials-one">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            Which <span>Memers</span> Will You Find On <br />{" "}
            <span>Meme States</span>
          </h2>
        </div>
        <div className="testimonials-one__carousel-outer">
          <div className="testimonials-one__carousel">
            <Swiper getSwiper={setSwiper}>
                {memers.map((memer, index)=>(
                    <div className="item">
                    <div className="testimonials-one__single">
                      <div className="testimonials-one__inner">
                        <p>
                          <h3>{memer.followers}</h3>
                          <span>Followers</span>
    
                          <h3>{memer.posts}</h3>
                          <span>Posts</span>
    
                          <h3>{memer.likes}</h3>
                          <span>Likes</span>
                        </p>
                        <h3>{memer.name}</h3>
                        <span>{memer.platform}</span>
                        <img src={memer.img} alt="alter text" />
                      </div>
                    </div>
                  </div>

                ))}
              
            </Swiper>
          </div>
          <div className="testimonials-one__carousel__shape-one"></div>
          <div className="testimonials-one__carousel__shape-two"></div>
          <div className="testimonials-one__nav">
            <div
              onClick={goPrev}
              onKeyDown={goPrev}
              role="button"
              tabIndex="-1"
              className="testimonials-one__nav-left"
            >
              <i className="dimon-icon-left-arrow"></i>
            </div>
            <div
              onClick={goNext}
              onKeyDown={goNext}
              role="button"
              tabIndex="-1"
              className="testimonials-one__nav-right"
            >
              <i className="dimon-icon-right-arrow"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
