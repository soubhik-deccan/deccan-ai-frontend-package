// import { type FC } from "react";
// import ReactMarkdown from "react-markdown";
// import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";

// // Import necessary styles for LaTeX rendering
// import "katex/dist/katex.min.css";
// import {
//   sanitizeMarkdownContent,
//   unescapeMarkdown,
// } from "../../../util/component/markdown";
// import { TPMarkdownRendererProps } from "./type";

// const PMarkdownRenderer: FC<TPMarkdownRendererProps> = ({ content }) => {
//   const sanitizedContent = sanitizeMarkdownContent(unescapeMarkdown(content));

//   // Custom component for rendering code blocks with syntax highlighting
//   const renderers = {
//     code({ node, inline, className, children, ...props }: any) {
//       const match = /language-(\w+)/.exec(className || "");
//       const SyntaxHighlighterComponent = SyntaxHighlighter as any;
//       return !inline && match ? (
//         <SyntaxHighlighterComponent
//           style={oneDark}
//           language={match[1]}
//           PreTag="div"
//           {...props}
//         >
//           {String(children).replace(/\n$/, "")}
//         </SyntaxHighlighterComponent>
//       ) : (
//         <code className={className} {...props}>
//           {children}
//         </code>
//       );
//     },
//   };

//   return sanitizedContent ? (
//     <ReactMarkdown
//       remarkPlugins={[remarkGfm]}
//       rehypePlugins={[rehypeRaw]}
//       components={{
//         ...renderers,
//         a: ({ node, ...props }) => {
//           const { target, rel, children, ...restProps } = props;
//           return (
//             <a
//               {...restProps}
//               target={target || "_blank"}
//               rel={rel || "noopener noreferrer"}
//             >
//               {children}
//             </a>
//           );
//         },
//       }}
//     >
//       {sanitizedContent}
//     </ReactMarkdown>
//   ) : null;
// };

// export default PMarkdownRenderer;



import { MathJaxContext } from "better-react-mathjax";
import "katex/dist/katex.min.css";
import { FC, Suspense, lazy, memo, useMemo } from 'react';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { sanitizeMarkdownContent, unescapeMarkdown } from '../../../util/component/markdown';
import type { TPMarkdownRendererProps } from "./type";

// Strategic lazy loading with immediate execution
const ReactMarkdown = lazy(() => import('react-markdown')
  .then(module => ({ default: module.default })));

const SyntaxHighlighter = lazy(() =>
  // @ts-ignore
  import('react-syntax-highlighter/dist/esm/prism-async-light')
    .then(module => ({
      default: Object.assign(module.default, {
        registerLanguage: (name: string, lang: any) =>
          // @ts-ignore
          module.registerLanguage(name, lang)
      })
    }))
);

// Load only critical syntax languages
const prismLanguages = {
  javascript: lazy(() => import('react-syntax-highlighter/dist/esm/languages/prism/javascript')),
  python: lazy(() => import('react-syntax-highlighter/dist/esm/languages/prism/python')),
  css: lazy(() => import('react-syntax-highlighter/dist/esm/languages/prism/css')),
};

// Lightweight math components
const MathJax = lazy(() => import('better-react-mathjax')
  .then(module => ({ default: module.MathJax })));

// Simplified MathJax config
const mathJaxConfig = {
  loader: { load: ['input/tex-base'] },
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['\\[', '\\]']],
    packages: { '[+]': ['base'] }
  },
  startup: { typeset: false },
  options: { enableMenu: false }
};

// Memoized components
const CodeBlock = memo(({ inline, className, children, ...props }: any) => {
  if (inline) return <code className={className} {...props}>{children}</code>;

  const match = /language-(\w+)/.exec(className || '');
  const lang = match?.[1] || 'text';
  const Language = prismLanguages[lang as keyof typeof prismLanguages];

  return (
    <div className="code-block-container">
      <Suspense fallback={<pre className={className} {...props}>{children}</pre>}>
        {/* @ts-ignore */}
        {Language && (
          <SyntaxHighlighter
            language={lang}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            {...props}
          />
        )}
      </Suspense>
    </div>
  );
});

const MathBlock = memo(({ value }: { value: string }) => (
  <MathJax dynamic>{`\\[${value}\\]`}</MathJax> // Ensuring block equations work properly
));

const InlineMath = memo(({ value }: { value: string }) => (
  <MathJax dynamic>{`$${value}$`}</MathJax> // Ensuring inline math renders properly
));



const PMarkdownRenderer: FC<TPMarkdownRendererProps> = ({ content }) => {
  const sanitizedContent = useMemo(() =>
    sanitizeMarkdownContent(unescapeMarkdown(content)),
    [content]
  );

  const components = useMemo(() => ({
    code: CodeBlock,
    math: MathBlock,
    inlineMath: InlineMath,
    table: ({ children, ...props }: any) => (
      <div className="table-container">
        <table {...props}>{children}</table>
      </div>
    ),
    a: ({ href, children, ...props }: any) => (
      <a href={href} target="_blank" rel="noopener" {...props}>
        {children}
      </a>
    )
  }), []);

  return (
    <div className="markdown-container">
      <MathJaxContext config={mathJaxConfig}>
        <Suspense fallback={<div className="content-loader">Loading...</div>}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={components}
            skipHtml={false}
            unwrapDisallowed={false}
          >
            {sanitizedContent}
          </ReactMarkdown>
        </Suspense>
      </MathJaxContext>
    </div>
  );
};

export default PMarkdownRenderer;