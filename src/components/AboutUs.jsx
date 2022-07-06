import React from "react";
import bgImage from "../assets/images/background/cta-one-bg.png";
import mocImage from "../assets/images/mocs/cta-moc-1-1.png";

export default function AboutUs() {
  return (
    <section className="cta-one">
      <span className="banner-one__shape-1">Meme</span>
      <span className="banner-one__shape-2">Meme</span>
      <span className="banner-one__shape-3">Meme</span>
      <span className="banner-one__shape-4">Meme</span>
      <span className="banner-one__shape-5">Meme</span>
      <img src={bgImage} className="cta-one__bg" alt="alter text" />
      <div className="container">
        <img src={mocImage} className="cta-one__moc" alt="alter text" />
        <div className="row justify-content-lg-end">
          <div className="col-lg-6">
            <div className="cta-one__content">
              <i className="cta-one__icon dimon-icon-visualization"></i>
              <div className="block-title text-left">
                <h2 className="block-title__title">
                  Just <span>Memes</span>.
                </h2>
              </div>
              <div className="cta-one__text">
                <p>
                  Meme States is purely focused on a building a community of Memers & Meme Lovers
                </p>
              </div>
              <ul className="list-unstyled">
                <li>
                  <i className="fa fa-check"></i>Report post that contain none meme content.
                </li>
                <li>
                  <i className="fa fa-check"></i>Vote for your favorite Memes & Memers for a world wide Competitions.
                </li>
                <li>
                  <i className="fa fa-check"></i>Customise your interests according to the Memes you would like to see.
                </li>
              </ul>
              <a href="#none" className="thm-btn">
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
