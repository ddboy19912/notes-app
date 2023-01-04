import { useRef, FormEvent, useState } from 'react';
import styles from '../styles';
import CreateableReactSelect from 'react-select/creatable';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { NoteData, Tags } from '../App';
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags: Tags[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  body = '',
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });
    navigate('..');
  };

  return (
    <form className={`${styles.Col} gap-8`} onSubmit={handleSubmit}>
      <div className={`${styles.Row} justify-between gap-4`}>
        <div className={`${styles.Col} gap-4`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className={styles.inputField}
            ref={titleRef}
            defaultValue={title}
            required
          />
        </div>
        <div className={`${styles.Col} gap-4`}>
          <label htmlFor="tags">Tags</label>
          <CreateableReactSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prevTags) => [...prevTags, newTag]);
            }}
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
      <div className={`${styles.Col} gap-4`}>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          className={`${styles.inputField}`}
          defaultValue={body}
          required
          rows={15}
          ref={bodyRef}
        />
      </div>
      <div className="flex justify-end gap-6">
        <Button
          buttonType="submit"
          label="Save"
          restStyles={styles.primaryBtn}
        />
        <Link to="..">
          <Button
            buttonType="button"
            label="Cancel"
            restStyles={styles.secondaryBtn}
          />
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
