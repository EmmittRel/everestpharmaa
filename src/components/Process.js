import React from "react";
import "../components/Process.css";

function Process() {
  return (
    <div>
      <div className="top_headd">
        <h1>Our Manufacturing Process</h1>
      </div>
      <ul className="process">
        <li className="process__item">
          <span className="process__number">1</span>
          <span className="process__title">API synthesis</span>
          <span className="process__subtitle">
            Synthesis and Chemical Manufacturing Process
          </span>
        </li>

        <li className="process__item">
          <span className="process__number">2</span>
          <span className="process__title"> Drug formulation</span>
          <span className="process__subtitle">
            Formulation and Drug Product Manufacturing Process
          </span>
        </li>

        <li className="process__item">
          <span className="process__number">3</span>
          <span className="process__title">Aseptic manufacturing</span>
          <span className="process__subtitle">
            Aseptic production of sterile products
          </span>
        </li>

        <li className="process__item">
          <span className="process__number">4</span>
          <span className="process__title">QC/QA</span>
          <span className="process__subtitle">
            Ensuring product safety and efficacy.
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Process;
