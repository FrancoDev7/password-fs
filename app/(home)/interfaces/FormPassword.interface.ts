export interface FormPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (password: {
    name: string;
    email: string;
    password: string;
    category: string;
    url?: string;
  }) => void;
}
