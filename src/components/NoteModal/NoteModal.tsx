import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import type NoteModalProps from '../../types/NoteModalProps';

export default function NoteModal({ closeModal }: NoteModalProps) {
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
      document.body.style.overflow = '';
    };
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
