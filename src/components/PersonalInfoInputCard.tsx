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
  onChangeObjective: React.ChangeEventHandler<HTMLTextAreaElement>;
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  onChangeWebsite: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhoneNumber: React.ChangeEventHandler<HTMLInputElement>;
  onChangeLocation: React.ChangeEventHandler<HTMLInputElement>;
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
}) => {
  return (
    <Card title="Personal Information" className="shadow-sm">
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value={name} onChange={onChangeName} placeholder="Jane Doe" />
        </Form.Item>
        <Form.Item label="Objective">
          <Input.TextArea
            rows={3}
            value={objective}
            onChange={onChangeObjective}
            placeholder="Short summary of your goals and strengths"
          />
        </Form.Item>
        <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-4">
          <Form.Item label="Email">
            <Input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="jane@example.com"
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              type="tel"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              placeholder="+1 555 0100"
            />
          </Form.Item>
          <Form.Item label="Website">
            <Input
              value={website}
              onChange={onChangeWebsite}
              placeholder="https://example.com"
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input
              value={location}
              onChange={onChangeLocation}
              placeholder="City, Country"
            />
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default PersonalInformationCard;
