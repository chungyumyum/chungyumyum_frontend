import controlIcon from "../../assets/icons/control.svg";
import styles from "./MainHeader.module.css";
import searchIcon from "../../assets/icons/search.svg";
import closeIcon from "../../assets/icons/close.svg";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchState, townsState } from "../../recoil/atom";
import { debounce } from "../../util/debounce";
import { Town } from "../../types/town";
import { allowScroll, preventScroll } from "../../util/scroll";

const RECOMMENDED_PARAGRAPH = [
  "어디서 회식하지?",
  "맵찔이 친구랑 어디가지?",
  "돈까스 맛집이 어디지?",
];

export default function MainHeader() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isDeemClicked, setIsDeemClicked] = useState(false);
  const [paragraphPosition, setParagraphPosition] = useState(0);
  const [showParagraph, setShowParagraph] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const setSearchState = useSetRecoilState(searchState);
  const [towns, setTowns] = useRecoilState(townsState);
  const [selectedTowns, setSelectedTowns] = useState<Town[]>([
    "GUNGDONG",
    "BONGMYEONG_DONG",
    "EOEUN_DONG",
    "JUKDONG",
    "JANGDAE_DONG",
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setSearchState(e.target.value);
    }, 500)();
  };

  const handleCompleteClick = () => {
    setTowns([...selectedTowns]);
    setIsDeemClicked(true);
    setTimeout(() => {
      setIsSidebarOpened(false);
    }, 200);
  };

  const handleChangeSelectedTowns = (e: MouseEvent) => {
    if (e.currentTarget.classList.contains(styles.selected)) {
      setSelectedTowns(
        selectedTowns.filter(
          (selectedTown) => selectedTown != e.currentTarget.id
        )
      );
    } else {
      setSelectedTowns([...selectedTowns, e.currentTarget.id as Town]);
    }

    e.currentTarget.classList.toggle(styles.selected);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParagraphPosition(
        (prev) => (prev + 2) % (RECOMMENDED_PARAGRAPH.length * 2)
      );
    }, 5000);

    () => {
      return clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickEvent = (e: globalThis.MouseEvent) => {
      if (
        e.target === searchRef.current ||
        (e.target && (e.target as HTMLElement).id === "para")
      ) {
        setShowParagraph(false);
      } else {
        if (searchRef.current?.value !== "") {
          return;
        }
        setShowParagraph(true);
      }
    };

    window.addEventListener("click", (e) => {
      handleClickEvent(e);
    });

    return () => {
      window.removeEventListener("click", handleClickEvent);
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpened) {
      preventScroll();
    } else {
      allowScroll();
    }
  }, [isSidebarOpened]);

  return (
    <>
      <div style={!isSidebarOpened ? { paddingTop: "7.9rem" } : {}}></div>
      <header
        style={isSidebarOpened ? { position: "initial" } : {}}
        className={styles.container}
      >
        <h1 className={styles.title} onClick={handleLogoClick}>
          충냠냠
        </h1>
        <div className={styles.searchContainer}>
          <input
            onChange={handleSearchChange}
            ref={searchRef}
            className={styles.search}
            type="text"
          />
          <img
            className={styles.searchIcon}
            src={searchIcon}
            alt="search_icon"
          />
          {showParagraph && (
            <div
              className={styles.recommendedParagraphContainer}
              onClick={() => {
                setShowParagraph(false);
                if (searchRef.current) {
                  searchRef.current.focus();
                }
              }}
            >
              <div
                style={{ top: `-${paragraphPosition}rem` }}
                className={styles.test}
              >
                {RECOMMENDED_PARAGRAPH.map((data) => (
                  <p
                    id="para"
                    className={styles.recommendedParagraph}
                    key={data}
                  >
                    {data}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            className={styles.controlBtn}
            onClick={() => {
              setIsDeemClicked(false);
              setIsSidebarOpened(true);
            }}
          >
            <img
              className={styles.controlIcon}
              src={controlIcon}
              alt="control_icon"
            />
          </button>
        </div>
      </header>
      {isSidebarOpened && (
        <>
          <div
            className={`${styles.deem} ${
              isDeemClicked && styles.deemDisappear
            }`}
            onClick={() => {
              setIsDeemClicked(true);
              setTimeout(() => {
                setIsSidebarOpened(false);
              }, 200);
            }}
          />
          <div
            className={`${styles.sidebar} ${
              isDeemClicked && styles.sidebarDisappear
            }`}
          >
            <div>
              <button
                className={styles.closeBtn}
                onClick={() => {
                  setIsDeemClicked(true);
                  setTimeout(() => {
                    setIsSidebarOpened(false);
                  }, 200);
                }}
              >
                <img src={closeIcon} alt="close_icon" />
              </button>
              <div className={styles.sidebarContents}>
                <h3 className={styles.sidebarTitle}>동네 설정</h3>
                <ul className={styles.sidebarList}>
                  <li
                    onClick={handleChangeSelectedTowns}
                    className={`${styles.sidebarListItem} ${
                      towns.includes("GUNGDONG") && styles.selected
                    }`}
                    id="GUNGDONG"
                  >
                    <span>궁동</span>
                  </li>
                  <li
                    onClick={handleChangeSelectedTowns}
                    className={`${styles.sidebarListItem} ${
                      towns.includes("BONGMYEONG_DONG") && styles.selected
                    }`}
                    id="BONGMYEONG_DONG"
                  >
                    <span>봉명동</span>
                  </li>
                  <li
                    onClick={handleChangeSelectedTowns}
                    className={`${styles.sidebarListItem} ${
                      towns.includes("EOEUN_DONG") && styles.selected
                    }`}
                    id="EOEUN_DONG"
                  >
                    <span>어은동</span>
                  </li>
                  <li
                    onClick={handleChangeSelectedTowns}
                    className={`${styles.sidebarListItem} ${
                      towns.includes("JUKDONG") && styles.selected
                    }`}
                    id="JUKDONG"
                  >
                    <span>죽동</span>
                  </li>
                  <li
                    onClick={handleChangeSelectedTowns}
                    className={`${styles.sidebarListItem} ${
                      towns.includes("JANGDAE_DONG") && styles.selected
                    }`}
                    id="JANGDAE_DONG"
                  >
                    <span>장대동</span>
                  </li>
                </ul>

                <button
                  onClick={handleCompleteClick}
                  className={styles.sidebarBtn}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
