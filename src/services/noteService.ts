import axios from 'axios';
import type { Note } from '../types/note';
import type NoteFormValues from '../types/NoteFormValues.ts';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
}

export async function fetchNotes(searchQuery: string, page: number): Promise<FetchNotesResponse> {
    if (searchQuery === '') {
        const res = await axios.get<FetchNotesResponse>('/notes', {
            params: {
                page,
                perPage: 12,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
            },
        });
        return res.data;
    } else {
        const res = await axios.get<FetchNotesResponse>('/notes', {
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
    

    
}

export async function createNote(noteData: NoteFormValues) {
    const res = await axios.post<Note>('/notes', noteData, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    });
    return res.data;
}

export async function deleteNote(noteId: number) {
    const res = await axios.delete<Note>(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    });
    return res.data;
}