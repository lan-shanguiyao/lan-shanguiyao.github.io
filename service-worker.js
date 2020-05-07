/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/C/index.html","d69e3f0549b88a2aded51f1067dca916"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/Last-fm/index.html","553b4494e62cd89fd0cef6e0a9d9de4f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/17/oop/index.html","ac8a7bcb1d810acaf823f122d42ee66f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/03/03/WSLtitle/index.html","0ef128eb783b79ffe4e72b8e4be2c776"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/04/16/baidu/index.html","28bf965d449860d4b1a94e53d6ab6583"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/about/index.html","f683bc970b90076870f8f928a1ca9e80"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/02/index.html","8e5cd3d0f8fa51fc27440e8a03dc8a1d"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/03/index.html","977b8105aedd587dac450e46b98dbb72"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/04/index.html","a1629c7f26c270b18443ef5556b2b368"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/index.html","1159fc9cc914e156268639f9c5b419a5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/index.html","05de9d7a8b2ae66bd5d880afe18ba98a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/WSL/index.html","52dbd2695cbc20d833b6111856da140b"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/index.html","9720c827f9286ad1d79f697dfef03bb4"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/style.css","933ae198446194acc25f560871222484"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/index.html","00f8784b8cd8e6c315405ca866404d6c"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/app.js","ea306851b6276a0ffeec351d138589e5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/valine.js","430596db58e60567246c52c474816ee6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/C/index.html","d9370157a226d16c7ed2f6ce9ef9d26a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Music/index.html","c9871d01c01f76ebbc7076205bb6f406"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/NET/index.html","f840ca6e642d2d9573f648ab200a2da1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/WSL/index.html","6bd1068d056eb5ecfd32f113314e7d4a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Windows/index.html","2e56816b2754c3e293de528042c2ea5a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/index.html","54981e6f7631c0282bbd2390541115db"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/折腾/index.html","d4eca91488207815502569c482937efe"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







