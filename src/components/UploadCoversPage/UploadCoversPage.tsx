import PageModal from "../PageModal/PageModal";

type UploadCoversPageProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UploadCoversPage({
  isOpen,
  onClose,
}: UploadCoversPageProps) {
  return (
    <PageModal isOpen={isOpen}>
      <div>aaaa</div>
      <button onClick={onClose}>x</button>
    </PageModal>
  );
}
