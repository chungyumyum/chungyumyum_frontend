import PageModal from "../PageModal/PageModal";
import styles from "./SearchShopPage.module.css";
import searchIcon from "../../assets/icons/search-xl.svg";
import { FormEvent, useEffect, useState } from "react";
import { getShops } from "../../api/shop";
import bunnyImage from "../../assets/covers/sad_bunny.svg";

type SearchShopPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectedShop: (name: string, id: number) => void;
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
    id: 0,
  });

  const [search, setSearch] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

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
      setIsEmpty(restaurants.length === 0);
      restaurants.map((restaurant) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
          ),
        });
        marker.name = restaurant.name;
        marker.address = restaurant.jibunAddress;
        marker.id = restaurant.id;

        window.kakao.maps.event.addListener(marker, "click", function () {
          setShop({
            ...shop,
            title: marker.name,
            id: marker.id,
            address: marker.address,
          });
        });

        marker.setMap(map);
      });

      const moveLatLon = new window.kakao.maps.LatLng(
        restaurants[0].latitude,
        restaurants[0].longitude
      );

      map.panTo(moveLatLon);
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

          <div
            id="map"
            className={`${styles.mapArea} ${isEmpty && styles.hide}`}
          >
            <div className={styles.selectedBox}>
              <h2 className={styles.selectedBoxTitle}>
                {shop.title || "가게 선택 안됨"}
              </h2>
              <p className={styles.selectedBoxAddress}>
                {shop.address || "가게를 선택해주세요"}
              </p>
            </div>
          </div>
          <div
            className={`${styles.buttonsContainer} ${isEmpty && styles.hide} `}
          >
            <button onClick={onClose}>취소</button>
            <button
              onClick={() => {
                onSelectedShop(shop.title, shop.id);
                onClose();
              }}
            >
              완료
            </button>
          </div>
          <div className={`${styles.notFound} ${!isEmpty && styles.hide}`}>
            <img src={bunnyImage} alt="sad_character" />
            <p className={styles.notFoundDescription}>
              검색하신 식당이 등록되지 않았어요. <br />
              정보를 알려주시면 빠른 시일 내에 <br />
              추가할게요!
            </p>
            <button className={styles.submitBtn}>
              <a href="https://open.kakao.com/o/sYAt0epg">제보하러 가기</a>
            </button>
          </div>
        </div>
      </div>
    </PageModal>
  );
}
