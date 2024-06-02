import React from "react";
import "../../styles/Main.css";

const OrganizationSection = () => (
  <section className="organization-section">
    <div className="section-header">
      <div className="section-title-wrapper">
        <h2 className="section-title">Create Your Organization's Page Today!</h2>
      </div>
      <div className="section-subtitle">
        Empower your business by creating a page on our platform. Here's why:
      </div>
    </div>
    <div className="section-content">
      <div className="content-item">
        <h3 className="item-title">1</h3>
        <h4 className="item-subtitle">Build Trust</h4>
        <p>Showcase your commitment to customer satisfaction and transparency.</p>
      </div>
      <div className="content-item">
        <h3 className="item-title">2</h3>
        <h4 className="item-subtitle">Direct Communication</h4>
        <p>Engage directly with your customers to understand and solve their concerns.</p>
      </div>
      <div className="content-item">
        <h3 className="item-title">3</h3>
        <h4 className="item-subtitle">Enhance Visibility</h4>
        <p>Increase your online presence and attract new customers.</p>
      </div>
      <div className="content-item">
        <h3 className="item-title">4</h3>
        <h4 className="item-subtitle">Feedback for Growth</h4>
        <p>Utilize customer feedback to improve your services and customer experience.</p>
      </div>
    </div>
    <div className="call-to-action">
      <p>Join us and forge stronger relationships with your customers — start by creating your organization’s page now!</p>
      <button onClick={() => alert('Create your organization page!')} className="create-button">
        Create
      </button>
    </div>
  </section>
);

export default OrganizationSection;
