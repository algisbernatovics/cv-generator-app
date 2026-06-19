"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import {
  createExperienceId,
  emptyCV,
  type CVData,
  type CVExperience,
  type CVProfile,
} from "@/lib/cv-types";
import { clearCVStorage, readCVFromStorage, writeCVToStorage } from "@/lib/cv-storage";

type CVAction =
  | { type: "hydrate"; data: CVData }
  | { type: "update-profile"; field: keyof CVProfile; value: string }
  | { type: "add-experience"; experience: CVExperience }
  | { type: "update-experience"; id: string; experience: CVExperience }
  | { type: "delete-experience"; id: string }
  | { type: "reset" };

function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case "hydrate":
      return action.data;
    case "update-profile":
      return {
        ...state,
        profile: { ...state.profile, [action.field]: action.value },
      };
    case "add-experience":
      return {
        ...state,
        experiences: [...state.experiences, action.experience],
      };
    case "update-experience":
      return {
        ...state,
        experiences: state.experiences.map((item) =>
          item.id === action.id ? action.experience : item
        ),
      };
    case "delete-experience":
      return {
        ...state,
        experiences: state.experiences.filter((item) => item.id !== action.id),
      };
    case "reset":
      return emptyCV;
    default:
      return state;
  }
}

export function useCVForm() {
  const [data, dispatch] = useReducer(cvReducer, emptyCV);
  const [hydrated, setHydrated] = useState(false);
  const editedBeforeHydrate = useRef(false);

  useEffect(() => {
    if (!editedBeforeHydrate.current) {
      dispatch({ type: "hydrate", data: readCVFromStorage() });
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeCVToStorage(data);
  }, [data, hydrated]);

  function markEdited() {
    editedBeforeHydrate.current = true;
  }

  return {
    data,
    hydrated,
    updateProfile(field: keyof CVProfile, value: string) {
      markEdited();
      dispatch({ type: "update-profile", field, value });
    },
    addExperience(experience: Omit<CVExperience, "id">) {
      markEdited();
      dispatch({
        type: "add-experience",
        experience: { ...experience, id: createExperienceId() },
      });
    },
    updateExperience(id: string, experience: Omit<CVExperience, "id">) {
      markEdited();
      dispatch({
        type: "update-experience",
        id,
        experience: { ...experience, id },
      });
    },
    deleteExperience(id: string) {
      markEdited();
      dispatch({ type: "delete-experience", id });
    },
    reset() {
      editedBeforeHydrate.current = false;
      dispatch({ type: "reset" });
      clearCVStorage();
    },
  };
}
