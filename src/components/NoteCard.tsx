import React from 'react';
import { Tags } from '../App';
import { Link } from 'react-router-dom';

export type NoteCardProps = {
  tags: Tags[];
  id: string;
  title: string;
};

const NoteCard = ({ tags, id, title }: NoteCardProps) => {
  return (
    <Link to={`/note/${id}`}>
      <div className="bg-white w-72 h-60 border hover:shadow-lg rounded-lg flex flex-col gap-8 items-center py-4">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-blue-300 text-white text-2xl font-medium mr-2 px-4 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              {tag.label}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
