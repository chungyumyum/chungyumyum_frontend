import PageModal from "../PageModal/PageModal";
import styles from "./SearchShopPage.module.css";
import searchIcon from "../../assets/icons/search-xl.svg";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { getShops } from "../../api/shop";
import bunnyImage from "../../assets/covers/sad_bunny.svg";
import closeIcon from "../../assets/icons/close.svg";
import { debounce } from "../../util/debounce";
import { Shop } from "../../types/shop";

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
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [results, setResults] = useState<Shop[]>([]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isOpen) return;
    (async function () {
      const restaurants = await getShops({ name: search });
      setIsEmpty(restaurants.length === 0);
      setResults([...restaurants]);
    })();
  };

  return (
    <PageModal isOpen={isOpen}>
      <div className={styles.containerForScroll}>
        <div className={styles.container}>
          <div className={styles.header}>
            <button style={{ cursor: "pointer" }} onClick={onClose}>
              <img
                style={{ verticalAlign: "top" }}
                width={15}
                src={closeIcon}
                alt="close_icon"
              />
            </button>
            <h2 className={styles.headerTitle}>가게 검색</h2>
          </div>
          <div className={styles.searchContainer}>
            <img width={18} src={searchIcon} alt="search_icon" />
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleSearchChange}
                className={styles.search}
                type="text"
                placeholder="검색"
              />
            </form>
          </div>

          <div
            id="listArea"
            className={`${styles.listArea} ${isEmpty && styles.hide}`}
          >
            {results.map((result) => (
              <div
                onClick={() => {
                  onSelectedShop(result.name, result.id);
                  onClose();
                }}
                className={styles.item}
                key={result.id}
              >
                <h2 className={styles.itemTitle}>{result.name}</h2>
                <p className={styles.itemAddress}>{result.jibunAddress}</p>
              </div>
            ))}
          </div>
          {/* <div
            className={`${styles.buttonsContainer} ${isEmpty && styles.hide} `}
          > */}
          {/* <button onClick={onClose}>취소</button>
            <button
              onClick={() => {
                onSelectedShop(shop.title, shop.id);
                onClose();
              }}
            >
              완료
            </button> */}
          {/* </div> */}
          <div className={`${styles.notFound} ${!isEmpty && styles.hide}`}>
            <img width={250} src={bunnyImage} alt="sad_character" />
            <p className={styles.notFoundDescription}>
              검색하신 식당이 등록되지 않았어요. <br />
              정보를 알려주시면 빠른 시일 내에 <br />
              추가할게요!
            </p>
            <button className={styles.submitBtn}>
              <a
                style={{ color: "#fff" }}
                href="https://open.kakao.com/o/sYAt0epg"
              >
                제보하러 가기
              </a>
            </button>
            <button
              onClick={() => {
                {
                  setIsEmpty(false);
                  onClose();
                }
              }}
              className={`${styles.submitBtn} ${styles.prevBtn}`}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </PageModal>
  );
}
