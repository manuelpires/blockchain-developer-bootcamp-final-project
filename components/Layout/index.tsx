import { ReactNode } from "react";
import Head from "next/head";
import Footer from "../Footer";

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
    <Footer />
  </>
);

export default Layout;
