"use client";

import DatePicker from "react-datepicker";
import { dateToMonthValue, parseMonthValue } from "@/lib/resume";

import "react-datepicker/dist/react-datepicker.css";

interface MonthPickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MonthPicker({
  id,
  value,
  onChange,
  disabled = false,
  placeholder = "Select month",
}: MonthPickerProps) {
  return (
    <div className="month-picker">
      <DatePicker
        id={id}
        selected={parseMonthValue(value)}
        onChange={(date: Date | null) => onChange(date ? dateToMonthValue(date) : "")}
        showMonthYearPicker
        showFullMonthYearPicker
        dateFormat="MMM yyyy"
        placeholderText={placeholder}
        disabled={disabled}
        readOnly
        isClearable={!disabled}
        autoComplete="off"
        className="month-picker__input"
        calendarClassName="month-picker__calendar"
        popperClassName="month-picker__popper"
        popperPlacement="bottom-start"
        showPopperArrow={false}
      />
    </div>
  );
}
