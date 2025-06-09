import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import { createPortal } from 'react-dom';
import type NoteFormProps from '../../types/NoteFormProps';

export default function NoteModal({ closeModal }: NoteFormProps) {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <NoteForm closeModal={closeModal} />
      </div>
    </div>,
    document.body
  );
}
