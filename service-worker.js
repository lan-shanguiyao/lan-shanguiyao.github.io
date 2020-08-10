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

var precacheConfig = [["F:/Blog/public/2020/02/07/C/index.html","8f6eb15fd08bd2327b639ffcae0518fb"],["F:/Blog/public/2020/02/07/Last-fm/index.html","5842c0bc881933ee5f95a9b389e631de"],["F:/Blog/public/2020/02/17/oop/index.html","9a402172bdb807a20c05d68832feb526"],["F:/Blog/public/2020/03/03/WSLtitle/index.html","f3e78f7707ece2c5974458a49e9211db"],["F:/Blog/public/2020/04/16/baidu/index.html","45d25e69476b9fafa362f6ad6c1603a0"],["F:/Blog/public/2020/07/06/leetcode-9-回文数/index.html","9051b0536958ed1c0086736dcee183d6"],["F:/Blog/public/2020/07/07/leetcode-1-两数之和/index.html","47547c1461b3124995cf76cb40d18b3f"],["F:/Blog/public/2020/07/10/leetcode-27-移除元素/index.html","fa2b0acb97f148d43f882085c45af65c"],["F:/Blog/public/about/index.html","9b69bc3777d6672284760b10d231a084"],["F:/Blog/public/archives/2020/02/index.html","261d628b15b7004c307b67827ca5bbdd"],["F:/Blog/public/archives/2020/03/index.html","586c9041008958f4933c2c1d49eb5272"],["F:/Blog/public/archives/2020/04/index.html","8f9e24ea465e2b64cbe9b617bb3d41d5"],["F:/Blog/public/archives/2020/07/index.html","9107763f1cfbaaca077844aeaacac696"],["F:/Blog/public/archives/2020/index.html","c5937af9b3dc62c745478ce78577cbb3"],["F:/Blog/public/archives/index.html","e2a53656af339f543d846b24f1681451"],["F:/Blog/public/categories/WSL/index.html","7a5b841ead7f80e651ae87adb25c90e7"],["F:/Blog/public/categories/index.html","95a35f415a0b4252f99181d915fa8b8f"],["F:/Blog/public/categories/leetcode/index.html","b681ae7f8d1e6045bbb90df9d2e2d72b"],["F:/Blog/public/css/style.css","933ae198446194acc25f560871222484"],["F:/Blog/public/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["F:/Blog/public/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["F:/Blog/public/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["F:/Blog/public/index.html","2526a4dedf5b47a0015ee842dac4919a"],["F:/Blog/public/js/app.js","ea306851b6276a0ffeec351d138589e5"],["F:/Blog/public/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["F:/Blog/public/js/valine.js","430596db58e60567246c52c474816ee6"],["F:/Blog/public/page/2/index.html","ff2fafbe44f7b6a54e48cf82571f3e74"],["F:/Blog/public/tags/C/index.html","2b62b410b4c4a47226e592cafe4a0cd3"],["F:/Blog/public/tags/Music/index.html","ce408b2e38a1e5e1a5183c8ad7970a91"],["F:/Blog/public/tags/NET/index.html","7871445f99396842bbf9267a2db8ae6e"],["F:/Blog/public/tags/WSL/index.html","f5e9accdfb9763938c644c8f1fa54cca"],["F:/Blog/public/tags/Windows/index.html","c1d076993cc8c299e28b34c9e9f0b6d0"],["F:/Blog/public/tags/index.html","0607c5ea976229048d8ccfd48bd26fb3"],["F:/Blog/public/tags/leetcode/index.html","9a21f920c555be740be450d494cb58b6"],["F:/Blog/public/tags/折腾/index.html","ff523bedae0863f7fbaef1c27673ac3a"],["F:/Blog/public/tags/题解/index.html","dd7e2377daad747934dc9321f4c1ba33"]];
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







