import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import { createPortal } from 'react-dom';
import type NoteFormProps from '../../types/NoteFormProps';
import { useEffect } from 'react';

export default function NoteModal({ closeModal }: NoteFormProps) {
  function handleBackdropClose(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  useEffect(() => {
    function handleEscapeClose(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleEscapeClose);

    return () => document.removeEventListener('keydown', handleEscapeClose);
  });

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClose}
    >
      <div className={css.modal}>
        <NoteForm closeModal={closeModal} />
      </div>
    </div>,
    document.body
  );
}
