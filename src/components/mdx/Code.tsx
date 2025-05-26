"use client";

import { cn } from '@/lib/utils';
import { ReactNode, createContext, useContext } from 'react';

// Context to track if <code> is inside <pre>
const CodeContext = createContext<{ isInsidePre: boolean }>({ isInsidePre: false });

interface CodeProps {
  className?: string;
  children: ReactNode;
}

// Common base for all <code>
export const Code = ({ className, children }: CodeProps) => {
  const { isInsidePre } = useContext(CodeContext);

  return (
      <code
          className={cn(
              'font-mono text-sm text-gray-900 dark:text-gray-100',
              !isInsidePre && 'bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700',
              className
          )}
      >
        {children}
      </code>
  );
};



// <pre> for code blocks
export const Pre = ({ className, children }: CodeProps) => {
  return (
      <CodeContext.Provider value={{ isInsidePre: true }}>
      <pre
          className={cn(
              'bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700',
              className
          )}
      >
        {children}
      </pre>
      </CodeContext.Provider>
  );
};