import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  url: string;
};

const Link = ({ children, url }: Props) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <span>{children}</span>
  </a>
);

export default Link;
