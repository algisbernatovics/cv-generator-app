import React, { useEffect, useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import type { Experience } from "./CVGenerator";

interface WorkExperienceInputCardProps {
  onAddExperience: (experience: Experience) => void;
  onSaveExperience: (index: number, experience: Experience) => void;
  editExperience: Experience | null;
  editExperienceIndex: number | null;
  setEditExperience: React.Dispatch<React.SetStateAction<Experience | null>>;
}

const WorkExperienceInputCard: React.FC<WorkExperienceInputCardProps> = ({
  onAddExperience,
  onSaveExperience,
  editExperience,
  editExperienceIndex,
  setEditExperience,
}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const isEditing = editExperience !== null && editExperienceIndex !== null;

  useEffect(() => {
    if (editExperience && editExperienceIndex !== null) {
      setJobTitle(editExperience.jobTitle);
      setCompany(editExperience.company);
      setStartDate(dayjs(editExperience.startDate, "YYYY-MM-DD"));
      setEndDate(dayjs(editExperience.endDate, "YYYY-MM-DD"));
      setDescription(editExperience.description);
      return;
    }

    setJobTitle("");
    setCompany("");
    setStartDate(null);
    setEndDate(null);
    setDescription("");
  }, [editExperience, editExperienceIndex]);

  const resetForm = () => {
    setJobTitle("");
    setCompany("");
    setStartDate(null);
    setEndDate(null);
    setDescription("");
  };

  const buildExperience = (): Experience | null => {
    if (!jobTitle.trim() || !company.trim() || !startDate || !endDate) {
      return null;
    }

    return {
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      description: description.trim(),
    };
  };

  const handleAddExperience = () => {
    const experience = buildExperience();
    if (!experience) {
      return;
    }

    onAddExperience(experience);
    resetForm();
  };

  const handleSaveExperience = () => {
    if (editExperienceIndex === null) {
      return;
    }

    const experience = buildExperience();
    if (!experience) {
      return;
    }

    onSaveExperience(editExperienceIndex, experience);
    setEditExperience(null);
    resetForm();
  };

  const handleCancelEdit = () => {
    setEditExperience(null);
    resetForm();
  };

  return (
    <Card
      title={isEditing ? "Edit Work Experience" : "Add Work Experience"}
      className="shadow-sm">
      <Form layout="vertical">
        <Form.Item label="Company" required>
          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Job Title" required>
          <Input
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Form.Item>
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Start Date" required>
              <DatePicker
                className="w-full"
                placeholder="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="End Date" required>
              <DatePicker
                className="w-full"
                placeholder="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description">
          <Input.TextArea
            rows={4}
            placeholder="Describe your responsibilities and achievements"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
      </Form>

      <div className="flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <Button type="primary" onClick={handleSaveExperience}>
              Save Experience
            </Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </>
        ) : (
          <Button type="primary" onClick={handleAddExperience}>
            Add Work Experience
          </Button>
        )}
      </div>
    </Card>
  );
};

export default WorkExperienceInputCard;
