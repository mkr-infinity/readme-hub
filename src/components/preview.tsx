import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PreviewProps {
  content: string;
  /** Render using GitHub-flavoured light styling (matches github.com README rendering). */
  githubStyle?: boolean;
}

export function Preview({ content, githubStyle = false }: PreviewProps) {
  if (githubStyle) {
    // Mimic GitHub's actual README rendering (light theme, system font, GitHub-y borders)
    return (
      <div className="github-md">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    style={oneLight as any}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 6,
                      padding: '1rem',
                      background: '#f6f8fa',
                      fontSize: 13,
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            img({ ...props }) {
              return (
                <img
                  {...props}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  style={{ display: 'inline-block', maxWidth: '100%', margin: '2px 3px', verticalAlign: 'middle' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0.4';
                  }}
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div
      className="prose prose-invert max-w-none
      prose-headings:font-sans prose-headings:tracking-tight prose-headings:uppercase prose-headings:font-bold
      prose-h1:text-4xl prose-h1:mb-3
      prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-foreground/30 prose-h2:pb-1.5
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
      prose-pre:bg-[#0E0E12] prose-pre:border-2 prose-pre:border-foreground/40 prose-pre:rounded-none
      prose-img:rounded-none prose-img:border-0 prose-img:my-1 prose-img:inline-block
      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:not-italic
      prose-strong:text-foreground
      prose-hr:border-foreground/30
      prose-details:bg-card prose-details:border-2 prose-details:border-foreground/40 prose-details:p-3 prose-details:my-3
      prose-summary:cursor-pointer prose-summary:font-mono prose-summary:uppercase prose-summary:font-bold prose-summary:tracking-wider prose-summary:text-sm prose-summary:select-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={oneDark as any}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, borderRadius: 0, padding: '1rem', background: '#0E0E12' }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ ...props }) {
            return (
              <img
                {...props}
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                style={{ display: 'inline-block', maxWidth: '100%', margin: '2px 3px', verticalAlign: 'middle' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.4';
                }}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
