import { useState } from 'react';
import Head from 'next/head';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Logo } from '../components';

export default function Home() {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  const firstPattern = 'watch?v=';
  const firstIndex = url.indexOf(firstPattern);

  const secondPattern = 'youtu.be/';
  const secondIndex = url.indexOf(secondPattern);

  const youTubeId =
    firstIndex !== -1
      ? url.slice(firstIndex + firstPattern.length, url.length)
      : url.slice(secondIndex + secondPattern.length, url.length);

  const embedUrlPrefix = 'https://www.youtube.com/embed/';
  const embed = `${embedUrlPrefix}${youTubeId}`;

  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>YouTube link converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        <div className="flex flex-col justify-center py-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
            <a
              href="https://www.lukebennett.com.au/"
              className="inline-block text-teal-700 transition duration-150 ease-in-out rounded-full hover:text-teal-500 focus:outline-none focus:shadow-outline"
            >
              <Logo className="h-12 mx-auto" />
            </a>
            <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
              YouTube link converter
            </h2>
            <p className="mt-2 text-sm leading-5 text-center text-gray-600">
              Paste a YouTube link below, and get the embed URL
            </p>
          </div>
          <div className="grid items-center justify-center gap-12 mt-8 lg:grid-cols-2">
            <div className="w-full max-w-md px-4 py-8 ml-auto space-y-6 bg-white shadow sm:rounded-lg sm:px-10">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  YouTube URL
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="url"
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      onChange={(e) => setUrl(e.target.value)}
                      className="block w-full transition duration-150 ease-in-out border-gray-300 form-input sm:leading-5"
                    />
                  </div>
                </label>
              </div>
              <CopyToClipboard text={embed} onCopy={() => setCopied(true)}>
                <div className="text-sm font-medium leading-5 text-gray-700 cursor-pointer focus:outline-none">
                  <div className="flex items-center space-x-1">Embed URL</div>
                  <div className="mt-1 rounded-md shadow-sm">
                    <div className="px-3 py-2 overflow-x-scroll border border-gray-300 rounded-md select-all sm:text-sm sm:leading-5">
                      <span className="text-gray-500">{embedUrlPrefix}</span>
                      <span className="text-teal-600">{youTubeId}</span>
                    </div>
                  </div>
                </div>
              </CopyToClipboard>
              <div>
                <CopyToClipboard text={embed} onCopy={() => setCopied(true)}>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="button"
                      className="flex items-center justify-center w-full px-4 py-2 space-x-1 text-sm font-medium text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700"
                    >
                      {copied ? 'Copied' : 'Get link'}
                    </button>
                  </span>
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full max-w-md overflow-hidden lg:max-w-lg sm:rounded-lg">
              <div style={{ paddingBottom: '56.25%' }} className="relative h-0">
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                  <iframe
                    src={embed}
                    frameBorder={0}
                    allowFullScreen
                    aria-hidden={false}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex={0}
                    title=""
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="bg-white">
          <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center md:order-2">
              <a
                href="https://twitter.com/luke_bennett_"
                className="ml-6 text-gray-500 hover:text-gray-500"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://github.com/lukebennett88"
                className="ml-6 text-gray-500 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-base leading-6 text-center text-gray-500">
                © {new Date().getFullYear()} Luke Bennett. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
