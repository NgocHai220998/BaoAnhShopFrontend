import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import {makeStyles} from '@material-ui/core/styles';
import {Divider, Paper} from '@material-ui/core';
import EditorToolbar from "@/components/RichEditor/components/EditorToolbar/EditorToolbar";
import {blockRenderMap} from "@/components/RichEditor/utils/block";

const useStyles = makeStyles(theme => ({
  root: {},
  editorContainer: {
    padding: theme.spacing(2),
    minHeight: 400,
    '& .public-DraftEditorPlaceholder-root': {
      ...theme.typography.body2
    },
    '& .public-DraftEditorPlaceholder-hasFocus': {
      display: 'none'
    },
    '& .public-DraftEditor-content': {
      '& p': {
        ...theme.typography.body1
      },
      '& h1': {
        ...theme.typography.h1
      },
      '& h2': {
        ...theme.typography.h2
      },
      '& h3': {
        ...theme.typography.h3
      },
      '& h4': {
        ...theme.typography.h4
      },
      '& h5': {
        ...theme.typography.h5
      },
      '& h6': {
        ...theme.typography.h6
      },
      '& blockquote': {
        ...theme.typography.subtitle1
      },
      '& ul': {
        ...theme.typography.body1,
        marginLeft: theme.spacing(4)
      },
      '& ol': {
        ...theme.typography.body1,
        marginLeft: theme.spacing(4)
      },
      '& pre': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    }
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  textAlignJustify: {
    textAlign: 'justify'
  }
}));

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

interface RichEditorProps {
  className?: string,
  placeholder?: any,
}

const RichEditor: React.FunctionComponent<RichEditorProps> = (props: RichEditorProps) => {
  const {placeholder, className, ...rest} = props;
  const classes = useStyles();
  const editorRef = useRef<HTMLInputElement>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleContainerClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleToolbarToggle = (type: any, value: any) => {
    if (type === 'blockType') {
      if (['left', 'center', 'right', 'justify'].includes(value)) {
        const newContentState = Modifier.setBlockData(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          // @ts-ignore
          new Map({type: 'text-align', value})
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'change-block-data'
        );
        setEditorState(newEditorState);
        return;
      }
      setEditorState(RichUtils.toggleBlockType(editorState, value));
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, value));
    }
  };

  const handleEditorChange = (editorState: any) => {
    setEditorState(editorState);
  };

  function blockStyleFn(contentBlock: any) {
    const textAlign = contentBlock.getData().get('text-align');
    if (textAlign) {
      const className = `textAlign${capitalize(textAlign)}`;
      // @ts-ignore
      return classes[className];
    }

    return '';
  }

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
    >
      <EditorToolbar
        editorState={editorState}
        onToggle={handleToolbarToggle}
      />
      <Divider/>
      <div
        className={classes.editorContainer}
        onClick={handleContainerClick}
      >
        <Editor
          blockRenderMap={blockRenderMap}
          blockStyleFn={blockStyleFn}
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder={placeholder}
          spellCheck
        />
      </div>
    </Paper>
  );
};

export default RichEditor;
