import { useState } from 'react';
import Head from 'next/head';

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

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  function copyToClipboard() {
    if (document !== 'undefined') {
      const el = document.createElement('textarea'); // Create a <textarea> element
      el.value = `${embedUrlPrefix}${cleanedYouTubeId}`; // Set its value to the string that you want copied
      el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
      el.style.position = 'absolute';
      el.style.left = '-9999px'; // Move outside the screen to make it invisible
      document.body.appendChild(el); // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false; // Mark as false to know no selection existed before
      el.select(); // Select the <textarea> content
      document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el); // Remove the <textarea> element
      if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
      }
      handleCopy();
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>YouTube link converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        <div className="flex flex-col justify-center py-24 sm:px-6 lg:px-8">
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
                  htmlFor="youtube_url"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  YouTube URL
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="youtube_url"
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      onChange={(e) => setUrl(e.target.value)}
                      className="block w-full truncate transition duration-150 ease-in-out border-gray-300 form-input sm:text-sm sm:leading-5"
                    />
                  </div>
                </label>
              </div>

              <div>
                <label
                  htmlFor="embed_url"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  <div className="flex items-center space-x-1">Embed URL</div>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="embed_url"
                      type="text"
                      onClick={copyToClipboard}
                      value={`${embedUrlPrefix}${cleanedYouTubeId}`}
                      className="block w-full truncate transition duration-150 ease-in-out bg-white border-gray-300 form-input sm:text-sm sm:leading-5"
                    />
                  </div>
                </label>
              </div>

              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center justify-center w-full px-4 py-2 space-x-1 text-sm font-medium text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline active:bg-teal-700"
                  >
                    {copied ? (
                      <>
                        <span>Copied</span>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4 check-circle"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Get link</span>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </span>
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
