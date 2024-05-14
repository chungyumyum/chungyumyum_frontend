import { Link, useLocation } from "react-router-dom";
import prevIcon from "../../assets/icons/prev.svg";
import styles from "./SubHeader.module.css";

type SubHeaderProps = {
  title: string;
  id?: string;
};

export default function SubHeader({ title, id }: SubHeaderProps) {
  const { pathname } = useLocation();
  console.log(id);
  return (
    <div className={styles.container}>
      {pathname !== "/post" && pathname !== "/edit" && (
        <Link
          to={pathname.includes("reviewList") ? `/reviewDetail/${id}` : "/"}
          className={styles.prevButton}
        >
          <img src={prevIcon} alt="prev_icon" />
        </Link>
      )}
      <p className={styles.title}>{title}</p>
    </div>
  );
}
