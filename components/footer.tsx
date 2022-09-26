import styles from "styles/Home.module.css";
import { Favicon } from "components/themes/svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://pcode.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo}>
          <Favicon
            style={{
              width: 32,
              height: 32,
            }}
          />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
