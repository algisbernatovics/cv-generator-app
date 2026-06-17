"use client";
import React from "react";
import { Layout, Row, Col } from "antd";
import CVGenerator from "../components/CVGenerator";
import "./page.css"; // Corrected the import statement for the CSS file
const { Header, Content } = Layout;

const HomePage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", padding: 0 }}>
      {/* Set padding to 0 */}
      <Header style={{ color: "#fff", textAlign: "center" }}>
        <h1 style={{ margin: 0 }}>CV Generator</h1>
      </Header>
      <Content style={{ padding: "40px 0" }}>
        <Row
          justify="center"
          align="middle"
          style={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            justifyContent: "center",
          }}>
          <Col xs={24} md={22} lg={18} style={{ width: "100%", padding: "0 20px" }}>
            <CVGenerator />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;