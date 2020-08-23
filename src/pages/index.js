import { useState } from 'react';
import Head from 'next/head';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Logo, Footer } from '../components';

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

  const cleanedYouTubeId = youTubeId.slice(
    0,
    youTubeId.indexOf('&') === -1 ? youTubeId.length : youTubeId.indexOf('&')
  );

  const embedUrlPrefix = 'https://www.youtube.com/embed/';
  const embed = `${embedUrlPrefix}${cleanedYouTubeId}`;

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
                      className="block w-full transition duration-150 ease-in-out border-gray-300 form-input sm:text-sm sm:leading-5"
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
                      <span className="text-teal-600">{cleanedYouTubeId}</span>
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
                    title="YouTube video"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
