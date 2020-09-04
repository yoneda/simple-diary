import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 300px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

const TextNoWrap = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
`;

const NoteBox = styled.div`
  background: white;
  margin-bottom: 10px;
  cursor: pointer;
  height: 32px;

  ${(props) =>
    props.selected &&
    css`
      background: skyblue;
    `}
`;

function Note(props) {
  const { title, body, selected, onClick } = props;
  return (
    <NoteBox onClick={() => onClick()} selected={selected}>
      <div>{title}</div>
      <div>{body}</div>
    </NoteBox>
  );
}

function ListPanel(props) {
  const { onSelectNote } = props;
  const notes = useStoreState((state) => state.notes.items);
  const [index, setIndex] = useState(-1);
  return (
    <Box>
      <div>ListPanel</div>
      {notes.map((note, noteIndex) => (
        <Note
          key={noteIndex}
          title={note.title}
          body={note.body}
          selected={noteIndex === index}
          onClick={() => {
            setIndex(noteIndex);
            onSelectNote(note);
          }}
        />
      ))}
    </Box>
  );
}

export default ListPanel;
