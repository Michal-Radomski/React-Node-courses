import React from "react";

export const UncontrolledFlow = ({ children, onDone }: { children: React.ReactNode; onDone?: () => void }) => {
  console.log("onDone:", onDone);

  // const [data, setData] = React.useState<{[key:string]:string}>({});
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  const currentChild = React.Children.toArray(children)[currentStepIndex];
  // console.log("currentChild:", currentChild);

  const next = (): void => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  if (React.isValidElement<{ next?: () => void }>(currentChild)) {
    return React.cloneElement<{ next?: () => void }>(currentChild, { next });
  }

  return currentChild;
};
