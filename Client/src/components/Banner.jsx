import React from "react";
import BannerMoc from "../assets/images/mocs/banner-moc-1-1.png";

export default function Banner() {
  return (
    <section className="banner-one" id="banner">
      <span className="banner-one__shape-1">Meme</span>
      <span className="banner-one__shape-2">Meme</span>
      <span className="banner-one__shape-3">Meme</span>
      <span className="banner-one__shape-4">Meme</span>
      <span className="banner-one__shape-5">Meme</span>
      <div className="container">
        <div className="banner-one__moc">
          <img src={BannerMoc} alt="alter text" />
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="banner-one__content">
              <h3 className="banner-one__title">
                Tired Of Personal <br />Posts .... <br />
                <span>Why not !?</span> <br /> Just Memes !
              </h3>
              <p className="banner-one__text">
                We are committed to providing you with just <br />{" "}
                <strong>Just High Quality Memes</strong> <br /> From the Best Memers Out There.
              </p>
              <a href="#none" className="banner-one__btn thm-btn ">
                <span>Sign Up !</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
