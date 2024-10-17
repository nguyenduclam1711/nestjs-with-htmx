import { ReactNode, ScriptHTMLAttributes } from 'react';

interface PageWrapperScript extends ScriptHTMLAttributes<HTMLScriptElement> {}

export type PageWrapperProps = {
  children: ReactNode;
  title?: string;
  scripts?: PageWrapperScript[];
};
const PageWrapper = (props: PageWrapperProps) => {
  const { children, title, scripts } = props;

  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="output_main.css" rel="stylesheet"></link>
        <script src="htmx.min.js"></script>
        <script src="/htmx/config.js" type="module"></script>
        {scripts &&
          scripts.map((scriptProps, index) => (
            <script key={`script-${index}`} {...scriptProps}></script>
          ))}
      </head>
      <body>{children}</body>
    </html>
  );
};

export default PageWrapper;
