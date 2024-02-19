import * as React from "react";

interface TitleProps {
  children?: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Title(props: TitleProps): React.ReactElement {
  return (
    <h2 className={props.className} color={props.color}>
      {props.children}
    </h2>
  );
}

export function SubTitle(props: TitleProps): React.ReactElement {
  return (
    <h3 className={props.className} color={props.color}>
      {props.children}
    </h3>
  );
}

export function Paragraph(props: TitleProps): React.ReactElement {
  return (
    <p className={props.className} color={props.color}>
      {props.children}
    </p>
  );
}
