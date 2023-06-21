import { Card, Col, List, Progress, Row } from "antd";
import { useState } from "react";
import BreadcrumbComponent from "../../Component/Breadcrumb";

const Dashboard = () => {
  const [bookingRemand] = useState(2);
  const [feedBackRemand] = useState(3);
  const [formRemand] = useState(2);
  return (
    <div>
      <BreadcrumbComponent />
      <div className="site-card-wrapper">
        <Row gutter={[16, 16]}>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Card title="Booking Remand" bordered={false}>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                type="dashboard"
                percent={(bookingRemand * 100) / 5}
                format={(bookingRemand) => `${(bookingRemand / 100) * 5}/5`}
                style={{ float: "right" }}
              />
            </Card>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Card title="Feedback Remand" bordered={false}>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                type="dashboard"
                percent={(feedBackRemand * 100) / 5}
                format={(feedBackRemand) => `${(feedBackRemand / 100) * 5}/5`}
                style={{ float: "right" }}
              />
            </Card>
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }}>
            <Card title="Form Remand" bordered={false}>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                type="dashboard"
                percent={(formRemand * 100) / 5}
                format={(formRemand) => `${(formRemand / 100) * 5}/5`}
                style={{ float: "right" }}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="New FeedBacks" bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={[]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item?.title}
                      description={item?.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Dashboard;
