import React from "react";
import "../components/Mission.css";

function Mission() {
  return (
    <div>
      <section className="section_mission">
        <div className="services-grid">
          <div className="service service1">
            <i className="fa fa-eye"></i>
            <h4>Our Vision</h4>
            <div className="points">
              <ul>
                <li>To lead the market with high quality & cost-effective products for serving humankind.</li>
                <li>To be recognized as domestic and internationally integrated healthcare and pharmaceutical company through Innovative & Quality products.</li>
              </ul>
            </div>
          </div>

          <div className="service service2">
            <i className="fa fa-tasks"></i>
            <h4>Our Mission</h4>
            <div className="points">
              <ul>
                <li>Adding Value to the society driven by high ethical standards in our practices.</li>
                <li>To discover, develop and successfully market pharmaceutical products to prevent, diagnose, alleviate and cure diseases.</li>
              </ul>
            </div>
          </div>

          <div className="service service3">
            <i className="fa fa-group"></i>
            <h4>Our Values</h4>
            <div className="points">
              <ul>
                <li>Our commitment to business ethics, honesty and transparency is as important as business.</li>
                <li>We believe we can make a difference only by thinking beyond the obvious. Prior to every action we take.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mission;
