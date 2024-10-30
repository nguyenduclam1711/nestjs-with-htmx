import { ReactNode, ScriptHTMLAttributes } from 'react';

interface PageWrapperScript extends ScriptHTMLAttributes<HTMLScriptElement> {}

export type PageWrapperProps = {
  children: ReactNode;
  title?: string;
  scripts?: PageWrapperScript[];
};
const PageWrapper = (props: PageWrapperProps) => {
  const { children, title, scripts = [] } = props;

  const allScripts: PageWrapperScript[] = [
    {
      src: 'htmx.min.js',
    },
    {
      src: '/htmx/config.js',
      type: 'module',
    },
    ...scripts,
  ];

  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="output_main.css" rel="stylesheet"></link>
        <script src="htmx.min.js"></script>
        <script src="/htmx/config.js" type="module"></script>
        {/* preload scripts */}
        {allScripts.map((scriptProps, index) => (
          <link
            key={`preload-script-${index}`}
            rel="preload"
            as="script"
            href={scriptProps.src}
          ></link>
        ))}
        {allScripts.map((scriptProps, index) => (
          <script key={`script-${index}`} {...scriptProps}></script>
        ))}
      </head>
      <body>
        <div className="relative">{children}</div>
      </body>
    </html>
  );
};

export default PageWrapper;
