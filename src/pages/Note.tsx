import React from 'react';
import { useNote } from './NoteLayout';
import styles from '../styles';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

type NoteProps = {
  onDeleteNote: (id: string) => void;
};

const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    onDeleteNote(id);
    navigate('/');
  };

  return (
    <div>
      <div className={`${styles.Row} items-center`}>
        <div className={styles.Col}>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <div className="flex mt-4">
              {note.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-blue-300 text-white text-base font-medium mr-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex">
          <Link to={`/note/${note.id}/edit`}>
            <Button
              label="Edit"
              buttonType="button"
              restStyles={styles.primaryBtn}
            />
          </Link>

          <button
            onClick={() => handleClick(note.id)}
            type="button"
            className={styles.dangerBtn}
          >
            Delete
          </button>

          <Link to={`/`}>
            <Button
              label="Back"
              buttonType="button"
              restStyles={styles.secondaryBtn}
            />
          </Link>
        </div>
      </div>
      <ReactMarkdown>{note.body}</ReactMarkdown>
    </div>
  );
};

export default Note;
