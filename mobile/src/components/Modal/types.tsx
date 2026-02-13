export interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}