import {Map} from 'immutable';
import {DefaultDraftBlockRenderMap, EditorState, Modifier} from 'draft-js';

export function setBlockData(editorState: any, data: any) {
  const newContentState = Modifier.setBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data
  );

  return EditorState.push(editorState, newContentState, 'change-block-data');
}

const newBlockRenderMap = Map({
  unstyled: {
    element: 'p'
  },
  paragraph: {
    element: 'p'
  }
});

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  newBlockRenderMap
);
