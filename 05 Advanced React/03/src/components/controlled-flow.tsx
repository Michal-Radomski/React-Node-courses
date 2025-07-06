import React from "react";

export const ControlledFlow = ({
  children,
  onDone,
  currentStepIndex,
  onNext,
}: {
  children: React.ReactNode[];
  onDone?: (data: { [key: string]: string | number }) => void;
  currentStepIndex: number;
  onNext: (dataFromStep: { [key: string]: string | number }) => void;
}) => {
  console.log("onDone:", onDone);

  const next = (data: { [key: string]: string | number }): void => {
    onNext(data);
  };

  const currentChild = React.Children.toArray(children)[currentStepIndex];

  if (React.isValidElement<{ next: (arg0: { [key: string]: string | number }) => void }>(currentChild)) {
    return React.cloneElement<{ next: (arg0: { [key: string]: string | number }) => void }>(currentChild, { next });
  }

  return currentChild;
};
