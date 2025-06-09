import css from './NoteForm.module.css';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '../../services/noteService';
import type NoteFormValues from '../../types/NoteFormValues.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface NoteFormProps {
  closeModal: () => void;
}

export default function NoteForm({ closeModal }: NoteFormProps) {
  const queryClient = useQueryClient();

  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: '',
  };

  // const FormAddMutation = useMutation({
  //   mutationFn: noteData => createNote(noteData),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  // });

  const FormAddMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  function handleSubmit(
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) {
    FormAddMutation.mutate(values);
    actions.resetForm();
    closeModal();
    console.log(values);
  }

  const NoteAddSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title is too long')
      .required('Title is required'),
    content: Yup.string().max(500, 'Content is too long'),
    tag: Yup.string()
      .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
      .required('Tag is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteAddSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
