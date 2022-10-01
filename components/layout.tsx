import Header from "./header";
import Footer from "./footer";

import ThemeSwitcher from "./theme-switcher";

interface LayoutProps {
  children: JSX.Element;
  hideSwitcher?: boolean;
}

const Layout = ({ children, hideSwitcher }: LayoutProps) => {
  return (
    <>
      <Header />
      {hideSwitcher ? undefined : <ThemeSwitcher />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
