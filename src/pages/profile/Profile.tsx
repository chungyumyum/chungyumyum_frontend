import styles from "./Profile.module.css";
import settingIcon from "../../assets/icons/setting.svg";
import { Badge } from "../../components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import levelIcon from "../../assets/icons/level.svg";
import { useEffect, useState } from "react";
import RatingModal from "../../components/RatingModal/RatingModal";
import { ProfileType } from "../../types/profile";
import { getProflie } from "../../api/profile";
import TriggerUpdateProvider from "./TriggerUpdateProvider";
import NavHeader from "./NavHeader";
import blueLevel from "../../assets/icons/blue_level.svg";
import redLevel from "../../assets/icons/red_level.svg";
import grayLevel from "../../assets/icons/gray_level.svg";
import greenLevel from "../../assets/icons/green_level.svg";
import orangeLevel from "../../assets/icons/orange_level.svg";

const getRatingAsKorean = {
  FRESHMAN: "새내기",
  BACHELOR: "쩝쩝학사",
  MASTERS: "쩝쩝석사",
  DOCTORATE: "쩝쩝박사",
  PROFESSOR: "먹교수",
};

const getLevelIcon = {
  FRESHMAN: grayLevel,
  BACHELOR: blueLevel,
  MASTERS: greenLevel,
  DOCTORATE: orangeLevel,
  PROFESSOR: redLevel,
};

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType);

  const handleLoadProflie = async () => {
    const profile = await getProflie();
    setProfile(profile);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    handleLoadProflie();
  }, []);

  return (
    <TriggerUpdateProvider>
      <RatingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className={styles.header}>
        <div className={styles.headings}>
          <div />
          <h1 className={styles.title}>My</h1>
          <button className={styles.settingBtn}>
            <Link to="/setting">
              <img width={23} src={settingIcon} alt="setting_icon" />
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.profile}>
          <img src={getLevelIcon[profile.rank]} alt="level" />
          <div>
            <div
              className={styles.levelContainer}
              onClick={() => setIsOpen(true)}
            >
              <button className={styles.level}>
                {getRatingAsKorean[profile.rank]}
              </button>
              <img width={13} src={levelIcon} alt="level_icon" />
            </div>
            <p className={styles.name}>{profile.nickname}</p>
          </div>
        </div>
        <NavHeader />
        <Outlet />
      </div>
    </TriggerUpdateProvider>
  );
}
