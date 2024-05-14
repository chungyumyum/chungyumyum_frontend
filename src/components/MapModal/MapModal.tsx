import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/icons/close.svg";
import styles from "./MapModal.module.css";

export default function MapModal({
  onClose,
  location,
}: {
  onClose: () => void;
  location: { lat: string; lng: string };
}) {
  useEffect(() => {
    const container = document.getElementById("shop_map");
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.lng),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(location.lat, location.lng),
    });

    marker.setMap(map);
  }, []);

  return (
    <ModalPortal>
      <div className={styles.deem} onClick={onClose}></div>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src={closeIcon} alt="close_icon" />
        </button>

        <div
          id="shop_map"
          style={{
            marginTop: "1rem",
            height: "40rem",
            backgroundColor: "dodgerblue",
            borderRadius: "1rem",
          }}
        ></div>
      </div>
    </ModalPortal>
  );
}

function ModalPortal({ children }: { children: ReactNode }) {
  const el = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, el);
}
