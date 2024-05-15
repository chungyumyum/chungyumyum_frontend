import { Link, useLocation, useNavigate } from "react-router-dom";
import prevIcon from "../../assets/icons/prev.svg";
import styles from "./SubHeader.module.css";

type SubHeaderProps = {
  title: string;
  id?: string;
};

export default function SubHeader({ title, id }: SubHeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(id);
  return (
    <div className={styles.container}>
      {pathname !== "/post" && pathname !== "/edit" && (
        <button
          onClick={() => {
            navigate(-1);
          }}
          // to={pathname.includes("reviewList") ? `/reviewDetail/${id}` : "/"}
          className={styles.prevButton}
        >
          <img src={prevIcon} alt="prev_icon" />
        </button>
      )}
      <p className={styles.title}>{title}</p>
    </div>
  );
}
