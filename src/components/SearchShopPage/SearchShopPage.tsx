import PageModal from "../PageModal/PageModal";
import styles from "./SearchShopPage.module.css";

type SearchShopPageProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchShopPage({
  isOpen,
  onClose,
}: SearchShopPageProps) {
  return <PageModal isOpen={isOpen}>adf</PageModal>;
}
