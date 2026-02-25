import { useState, useEffect, useCallback } from 'react';
import type { IntakeAnswers } from '../lib/intake/types';

const STORAGE_KEY = 'clearpath_intake_v1';

interface StoredIntake {
  answers: IntakeAnswers;
  currentStep: number;
  savedAt: string;
  isComplete: boolean;
}

const defaultAnswers: IntakeAnswers = { mode: 'patient' };

export function useIntake() {
  const [answers, setAnswers] = useState<IntakeAnswers>(defaultAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: StoredIntake = JSON.parse(raw);
        setAnswers(stored.answers);
        setCurrentStep(stored.currentStep);
        setIsComplete(stored.isComplete);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      const stored: StoredIntake = {
        answers,
        currentStep,
        savedAt: new Date().toISOString(),
        isComplete,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* ignore */
    }
  }, [answers, currentStep, isComplete]);

  const updateAnswers = useCallback((partial: Partial<IntakeAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }));
  }, []);

  const goToStep = useCallback((n: number) => setCurrentStep(n), []);

  const nextStep = useCallback((totalSteps: number) => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const markComplete = useCallback(() => setIsComplete(true), []);

  const clearIntake = useCallback(() => {
    setAnswers(defaultAnswers);
    setCurrentStep(0);
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const saveAndShowMessage = useCallback(() => {
    setSavedMessage('Progress saved. You can return any time to continue.');
    setTimeout(() => setSavedMessage(''), 4000);
  }, []);

  const hasSavedData = useCallback((): boolean => {
    try {
      return !!localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  }, []);

  const getSavedAt = useCallback((): string | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: StoredIntake = JSON.parse(raw);
        return stored.savedAt;
      }
    } catch {
      /* ignore */
    }
    return null;
  }, []);

  return {
    answers,
    currentStep,
    isComplete,
    savedMessage,
    updateAnswers,
    goToStep,
    nextStep,
    prevStep,
    markComplete,
    clearIntake,
    saveAndShowMessage,
    hasSavedData,
    getSavedAt,
  };
}
