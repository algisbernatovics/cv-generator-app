"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { getYear } from "date-fns";
import { dateToMonthValue, parseMonthValue } from "@/lib/resume";

import "react-datepicker/dist/react-datepicker.css";

interface MonthPickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

interface MonthPickerInputProps {
  value?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const MonthPickerInput = forwardRef<HTMLInputElement, MonthPickerInputProps>(
  function MonthPickerInput({ value, onClick, placeholder, disabled, className }, ref) {
    return (
      <div className="month-picker__control">
        <input
          ref={ref}
          className={`month-picker__input ${className ?? ""}`.trim()}
          value={value ?? ""}
          onClick={onClick}
          readOnly
          placeholder={placeholder}
          disabled={disabled}
        />
        <span className="month-picker__icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
      </div>
    );
  }
);

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
        dateFormat="MMM yyyy"
        placeholderText={placeholder}
        disabled={disabled}
        isClearable={!disabled}
        autoComplete="off"
        portalId="cv-datepicker-portal"
        popperPlacement="bottom-start"
        closeOnScroll={false}
        customInput={<MonthPickerInput disabled={disabled} placeholder={placeholder} />}
        calendarClassName="month-picker__calendar"
        popperClassName="month-picker__popper"
        wrapperClassName="month-picker__wrapper"
        showPopperArrow={false}
        shouldCloseOnSelect
        renderCustomHeader={({
          date,
          decreaseYear,
          increaseYear,
          prevYearButtonDisabled,
          nextYearButtonDisabled,
        }) => (
          <div className="month-picker__toolbar">
            <button
              type="button"
              className="month-picker__nav-btn"
              onClick={decreaseYear}
              disabled={prevYearButtonDisabled}
              aria-label="Previous year"
            >
              ‹
            </button>
            <span className="month-picker__year">{getYear(date)}</span>
            <button
              type="button"
              className="month-picker__nav-btn"
              onClick={increaseYear}
              disabled={nextYearButtonDisabled}
              aria-label="Next year"
            >
              ›
            </button>
          </div>
        )}
      />
    </div>
  );
}
