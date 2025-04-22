import React from 'react';

/**
 * Parses a string with custom className syntax like:
 * "<font-semibold text-violet-400>Hello</ font-semibold text-violet-400>"
 */
export function parseStyledText(input: string): React.ReactNode[] {
  const tagRegex = /<([a-zA-Z0-9- ]+?)>(.*?)<\/\1>/gs;

  const parse = (str: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(str)) !== null) {
      const [ fullMatch, className, content ] = match;
      const matchStart = match.index;

      if (matchStart > lastIndex) {
        result.push(str.slice(lastIndex, matchStart));
      }

      result.push(<span key={matchStart} className={className}>
        {parse(content)}
      </span>);

      lastIndex = matchStart + fullMatch.length;
    }

    if (lastIndex < str.length) {
      result.push(str.slice(lastIndex));
    }

    return result;
  };

  return parse(input);
}
