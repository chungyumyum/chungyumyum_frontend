import controlIcon from "../../assets/icons/control.svg";
import styles from "./Header.module.css";
import searchIcon from "../../assets/icons/search.svg";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>충냠냠</h1>
      <div className={styles.searchContainer}>
        <input
          className={styles.search}
          type="text"
          placeholder="돈까스 맛집이 어디더라?"
        />
        <img className={styles.searchIcon} src={searchIcon} alt="search_icon" />
      </div>
      <div>
        <img
          className={styles.controlIcon}
          src={controlIcon}
          alt="control_icon"
        />
      </div>
    </header>
  );
}
