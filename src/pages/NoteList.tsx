import ReactSelect from 'react-select';
import Button from '../components/Button';
import styles from '../styles';
import { Link } from 'react-router-dom';
import { Tags, Note } from '../App';
import { useState, useMemo } from 'react';
import NoteCard, { NoteCardProps } from '../components/NoteCard';

type NoteListProps = {
  availableTags: Tags[];
  notes: NoteCardProps[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

export default function NoteList({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const [modal, setModal] = useState<Boolean>(false);

  const [title, setTitle] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div>
      <div className={`${styles.Row} justify-between mb-8 gap-10`}>
        <div>
          <h1 className={styles.titleText}>Home</h1>
        </div>
        <div>
          <Link to="/new">
            <Button
              label="Create"
              buttonType="button"
              restStyles={styles.primaryBtn}
            />
          </Link>
          <button
            onClick={() => setModal(!modal)}
            type="button"
            className={styles.secondaryBtn}
          >
            Edit Tags
          </button>
        </div>
      </div>
      <form>
        <div className={`${styles.Row} mb-8 items-center gap-8`}>
          <div className={styles.Col}>
            <h2>Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={`${styles.Col}`}>
            <label htmlFor="tags">Tags</label>
            <ReactSelect
              options={availableTags.map((tag) => {
                return {
                  label: tag.label,
                  value: tag.id,
                };
              })}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
            />
          </div>
        </div>
      </form>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {filteredNotes.map((notes) => (
          <div key={notes.id}>
            <NoteCard id={notes.id} title={notes.title} tags={notes.tags} />
          </div>
        ))}
      </div>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[50rem] my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Tags</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col justify-center items-center  gap-4">
                  {availableTags.map((tag) => (
                    <div
                      className={`${styles.Row} justify-between items-center gap-5`}
                    >
                      <input
                        value={tag.label}
                        onChange={(e) => updateTag(tag.id, e.target.value)}
                        className="text-2xl font-normal border w-full py-[0.75rem] rounded-lg pl-4"
                      />

                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="text-2xl text-red-500 border-red-500 hover:text-red-300 hover:border-red-300 rounded-lg border w-14 h-14"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
