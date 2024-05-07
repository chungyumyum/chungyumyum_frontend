import PageModal from "../PageModal/PageModal";
import styles from "./SearchShopPage.module.css";
import searchIcon from "../../assets/icons/search-xl.svg";
import { useEffect } from "react";

type SearchShopPageProps = {
  isOpen: boolean;
  onClose: () => void;
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SearchShopPage({
  isOpen,
  onClose,
}: SearchShopPageProps) {
  useEffect(() => {
    if (!isOpen) return;
    const container = document.getElementById("map");
    console.log(container);
    const options = {
      center: new window.kakao.maps.LatLng(36.360118, 127.34753),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, [isOpen]);

  return (
    <PageModal isOpen={isOpen}>
      <div className={styles.containerForScroll}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <img width={18} src={searchIcon} alt="search_icon" />
            <input className={styles.search} type="text" placeholder="검색" />
          </div>

          <div id="map" className={styles.mapArea}>
            this is for map
            <div className={styles.selectedBox}>
              <h2 className={styles.selectedBoxTitle}>선택된 가게 없음</h2>
              <p className={styles.selectedBoxAddress}>가게를 선택해주세요.</p>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button onClick={onClose}>취소</button>
            <button>완료</button>
          </div>
        </div>
      </div>
    </PageModal>
  );
}
