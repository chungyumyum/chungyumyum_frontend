import PageModal from "../PageModal/PageModal";
import styles from "./SearchShopPage.module.css";
import searchIcon from "../../assets/icons/search-xl.svg";
import { FormEvent, useEffect, useState } from "react";
import { getShops } from "../../api/shop";

type SearchShopPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectedShop: (name: string) => void;
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SearchShopPage({
  isOpen,
  onClose,
  onSelectedShop,
}: SearchShopPageProps) {
  const [shop, setShop] = useState({
    title: "",
    address: "",
  });

  const [search, setSearch] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTriggerUpdate((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(36.360118, 127.34753),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);

    (async function () {
      const restaurants = await getShops({ name: search });

      restaurants.map((restaurant) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
          ),
        });
        marker.name = restaurant.name;
        marker.address = restaurant.jibunAddress;

        window.kakao.maps.event.addListener(marker, "click", function () {
          setShop({
            ...shop,
            title: marker.name,
            address: marker.address,
          });
        });

        marker.setMap(map);
      });
    })();
  }, [isOpen, triggerUpdate]);

  return (
    <PageModal isOpen={isOpen}>
      <div className={styles.containerForScroll}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <img width={18} src={searchIcon} alt="search_icon" />
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                className={styles.search}
                type="text"
                placeholder="검색"
              />
            </form>
          </div>

          <div id="map" className={styles.mapArea}>
            this is for map
            <div className={styles.selectedBox}>
              <h2 className={styles.selectedBoxTitle}>
                {shop.title || "가게 선택 안됨"}
              </h2>
              <p className={styles.selectedBoxAddress}>
                {shop.address || "가게를 선택해주세요"}
              </p>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button onClick={onClose}>취소</button>
            <button
              onClick={() => {
                onSelectedShop(shop.title);
                onClose();
              }}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </PageModal>
  );
}
