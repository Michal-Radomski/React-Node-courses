import React from "react";

const Component = ({ keyword }: { keyword: string }): JSX.Element => {
  const init = performance.now();

  while (init > performance.now() - 100) {
    //Slowing down the component on purpose.
  }

  return (
    <React.Fragment>
      <h2>I am a slow component</h2>
      {keyword}
    </React.Fragment>
  );
};

const HeavyComponent = React.memo(Component);

const HeavyComponentWrapper = (): JSX.Element => {
  const [keyword, setKeyword] = React.useState<string>("");

  const deferredKeyword: string = React.useDeferredValue<string>(keyword);
  // console.log("deferredKeyword:", deferredKeyword);

  return (
    <React.Fragment>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <HeavyComponent keyword={deferredKeyword} />
    </React.Fragment>
  );
};

export default HeavyComponentWrapper;
