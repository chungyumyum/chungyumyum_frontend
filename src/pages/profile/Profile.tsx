import styles from "./Profile.module.css";
import settingIcon from "../../assets/icons/setting.svg";

export default function Profile() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headings}>
          <div />
          <h1 className={styles.title}>My</h1>
          <button className={styles.settingBtn}>
            <img width={24} src={settingIcon} alt="setting_icon" />
          </button>
        </div>
      </div>
    </>
  );
}
