import React from "react";

export const UncontrolledFlow = ({
  children,
  onDone,
}: {
  children: React.ReactNode[];
  onDone?: (data: { [key: string]: string | number }) => void;
}) => {
  // console.log("onDone:", onDone);

  const [data, setData] = React.useState<{ [key: string]: string | number }>({});
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);

  const currentChild = React.Children.toArray(children)[currentStepIndex];
  // console.log("currentChild:", currentChild);

  const next = (dataFromStep: { [key: string]: string | number }): void => {
    const nextIndex = currentStepIndex + 1;
    const updatedData = { ...data, ...dataFromStep } as { [key: string]: string | number };

    console.log("updatedData:", updatedData);

    if (nextIndex < children?.length) {
      setCurrentStepIndex(nextIndex);
    } else {
      onDone!(updatedData);
    }

    setData(updatedData);
  };

  if (React.isValidElement<{ next: (arg0: { [key: string]: string | number }) => void }>(currentChild)) {
    return React.cloneElement<{ next: (arg0: { [key: string]: string | number }) => void }>(currentChild, { next });
  }

  return currentChild;
};
