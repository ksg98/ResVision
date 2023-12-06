import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">ResVision : Where BFT meets Clarity</h1>
      <p>Empowering Clarity in Complex Systems: Our BFT Visualization Tool brings the intricate world of Byzantine Fault Tolerance into sharp focus. Designed for both experts and newcomers, it transforms complex network dynamics into clear, interactive visualizations. Experience unparalleled insight into BFT mechanisms, facilitating deeper understanding, efficient problem-solving, and innovation in secure network design.</p>

      <div className="gpt3__header-content__input">
        {/* <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button> */}
      </div>

      <div className="gpt3__header-content__people">
        {/* <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p> */}
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
