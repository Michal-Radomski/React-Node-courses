import React from "react";

type TextPanProps = {
  children: string;
} & React.ComponentPropsWithoutRef<"div">;

type NotShortTextProps = TextPanProps & { short?: false };
type ShortTextProps = TextPanProps & { short: true; expanded?: boolean };

const shortString = (string: string, length = 50) => string.slice(0, length) + "…";

function TextPan(props: NotShortTextProps): JSX.Element;

function TextPan(props: ShortTextProps): JSX.Element;

function TextPan(props: TextPanProps & { short?: boolean; expanded?: boolean }): JSX.Element {
  const { children, short, expanded, ...otherProps } = props;

  const shouldTruncate = short && !expanded;

  return (
    <React.Fragment>
      <div aria-expanded={!!expanded} {...otherProps}>
        {shouldTruncate ? shortString(children) : children}
      </div>
    </React.Fragment>
  );
}

export default TextPan;
