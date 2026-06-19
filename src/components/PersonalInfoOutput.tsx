import React from "react";
import {
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const CVPersonalInfo: React.FC<{
  name: string;
  email: string;
  website: string;
  phoneNumber: string;
  location: string;
  objective: string;
}> = ({ name, email, website, phoneNumber, location, objective }) => {
  const displayName = name.trim() || "Your Name";
  const displayObjective =
    objective.trim() || "Your professional summary will appear here.";

  const contactItems = [
    { icon: <MailOutlined aria-hidden />, value: email, label: "Email" },
    { icon: <PhoneOutlined aria-hidden />, value: phoneNumber, label: "Phone" },
    {
      icon: <EnvironmentOutlined aria-hidden />,
      value: location,
      label: "Location",
    },
    {
      icon: <GlobalOutlined aria-hidden />,
      value: website,
      label: "Website",
    },
  ].filter((item) => item.value.trim());

  return (
    <div className="px-3 pb-2 pt-1">
      <div className="mb-3 border-b-4 border-[#337aff]" />
      <p className="mb-2 text-2xl font-semibold text-[#4e94c1]">{displayName}</p>
      <p className="mb-4 whitespace-pre-wrap text-slate-700">{displayObjective}</p>

      {contactItems.length > 0 ? (
        <ul className="mb-2 grid gap-2 sm:grid-cols-2">
          {contactItems.map((item) => (
            <li key={item.label} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 text-[#4e94c1]">{item.icon}</span>
              <span>
                <span className="sr-only">{item.label}: </span>
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">Add contact details to preview them here.</p>
      )}
    </div>
  );
};

interface PersonalInfoOutputCardProps {
  name: string;
  email: string;
  website: string;
  phoneNumber: string;
  location: string;
  objective: string;
}

const PersonalInfoOutputCard: React.FC<PersonalInfoOutputCardProps> = (props) => {
  return <CVPersonalInfo {...props} />;
};

export default PersonalInfoOutputCard;
