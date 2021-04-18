import React, {useRef} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const trimCode = (input: any) => {
  const codeLines = input.split('\n');

  if (!codeLines[0].trim()) {
    codeLines.shift();
  }

  if (!codeLines[codeLines.length - 1].trim()) {
    codeLines.pop();
  }

  const indexOfFirstChar = codeLines[0].search(/\S|$/);

  let output = '';

  codeLines.forEach((line: string, index: number) => {
    output = output + line.substr(indexOfFirstChar, line.length);

    if (index !== codeLines.length - 1) {
      output = output + '\n';
    }
  });

  return output;
};

interface CodeBlockProps {
  async: boolean,
  className?: string,
  component?: any,
  language: string,
  source: string,
}

const CodeBlock: React.FunctionComponent<CodeBlockProps> = (props: CodeBlockProps) => {
  const {
    async,
    source,
    language,
    className,
    component: Component,
    ...rest
  } = props;

  const ref = useRef(null);
  const classes = useStyles();

  return (
    <pre className={`language-${language}`}>
      <Component
        {...rest}
        className={clsx(classes.root, className)}
        ref={ref}
      >
        {trimCode(source)}
      </Component>
    </pre>
  );
};

export default CodeBlock;
