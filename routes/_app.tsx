import { type PageProps } from '$fresh/server.ts';

export default function App(props: PageProps) {
  return (
    <html lang='en'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>necipsagiro.dev</title>
        <link rel='stylesheet' href='/css/tailwind.css' />
        <link rel='stylesheet' href='/css/general.css' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin='true' />
        <link href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap' rel='stylesheet' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='necipsagiro.dev' />
        <meta name='author' content='Necip Sagiroglu' />
      </head>
      <body class='flex flex-col p-5 gap-6 h-screen max-w-[calc(80ch+40px)] mx-auto bg-[#F8EDE3]'>
        <props.Component />
      </body>
    </html>
  );
};
