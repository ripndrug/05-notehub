import axios from 'axios';
import type Note from '../types/note';
import type NoteFormValues from '../types/NoteFormValues.ts';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface SearchBoxProps {
    notes: Note[],
    totalPages: number,
}

export async function fetchNotes(searchQuery: string, page: number): Promise<SearchBoxProps> {
    const res = await axios.get<SearchBoxProps>('/notes', {
        params: {
            search: searchQuery,
            page,
            perPage: 12,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        },
    });

    return res.data;
}

export async function createNote(noteData: NoteFormValues) {
    const res = await axios.post<Note>('/notes', noteData);
    return res.data;
}

export async function deleteNote(noteId: string) {
    const res = await axios.delete(`/notes/${noteId}`);
    return res.data;
}