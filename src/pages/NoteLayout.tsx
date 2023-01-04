import React from 'react';
import { NoteCardProps } from '../components/NoteCard';
import {
  useParams,
  Navigate,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
import { Note } from '../App';

type NoteProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteProps) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (note === null) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
};

export default NoteLayout;

export function useNote() {
  return useOutletContext<Note>();
}
