import React from "react";
import { Button, List } from "antd";
import type { Experience } from "./CVGenerator";

interface WorkExperienceOutputCardProps {
  experiences: Experience[];
  onEditExperience: (experience: Experience, index: number) => void;
  onDeleteExperience: (index: number) => void;
}

const WorkExperienceOutput: React.FC<WorkExperienceOutputCardProps> = ({
  experiences,
  onEditExperience,
  onDeleteExperience,
}) => {
  return (
    <div className="px-3 pb-4">
      <h2 className="mb-3 flex items-center text-xl font-semibold text-[#4e94c1]">
        <span
          aria-hidden
          className="mr-2 inline-block h-1.5 w-8 rounded bg-[#4e94c1]"
        />
        Work Experience
      </h2>

      {experiences.length === 0 ? (
        <p className="text-sm text-slate-500">No work experiences added yet.</p>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={experiences}
          renderItem={(item, index) => (
            <List.Item className="border-b border-slate-100 px-0 py-4 last:border-b-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-1 text-base font-semibold text-slate-800">
                    {item.company}
                  </p>
                  <p className="text-lg text-[#4e94c1]">{item.jobTitle}</p>
                </div>
                <p className="text-sm text-slate-500 sm:text-right">
                  {item.startDate} – {item.endDate}
                </p>
              </div>

              {item.description ? (
                <p className="mt-2 whitespace-pre-wrap text-slate-700">
                  {item.description}
                </p>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="small" onClick={() => onEditExperience(item, index)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={() => onDeleteExperience(index)}>
                  Delete
                </Button>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default WorkExperienceOutput;
