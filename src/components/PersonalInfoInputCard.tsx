import React from "react";
import { Form, Input, Card } from "antd";

interface PersonalInformationCardProps {
  name: string;
  email: string;
  website: string;
  phoneNumber: string;
  location: string;
  objective: string;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeObjective: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  onChangeWebsite: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhoneNumber: React.ChangeEventHandler<HTMLInputElement>;
  onChangeLocation: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}

const PersonalInformationCard: React.FC<PersonalInformationCardProps> = ({
  name,
  email,
  website,
  phoneNumber,
  location,
  objective,
  onChangeName,
  onChangeObjective,
  onChangeEmail,
  onChangeWebsite,
  onChangePhoneNumber,
  onChangeLocation,
  style,
}) => {
  return (
    <Card
      title="Personal Information"
      style={{ background: "#f0f0f0", padding: "10px", margin: "10px", ...style }}>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value={name} onChange={onChangeName} />
        </Form.Item>
        <Form.Item label="Objective">
          <Input value={objective} onChange={onChangeObjective} />
        </Form.Item>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "8px" }}>
            <Form.Item label="Email">
              <Input type="email" value={email} onChange={onChangeEmail} />
            </Form.Item>
            <Form.Item label="Website">
              <Input value={website} onChange={onChangeWebsite} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Phone">
              <Input
                type="tel"
                value={phoneNumber}
                onChange={onChangePhoneNumber}
              />
            </Form.Item>
            <Form.Item label="Location">
              <Input value={location} onChange={onChangeLocation} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default PersonalInformationCard;
