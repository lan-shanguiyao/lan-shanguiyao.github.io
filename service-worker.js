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

var precacheConfig = [["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/C/index.html","80ca7adb2b4cd666b79cf587da48e3f7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/Last-fm/index.html","5842c0bc881933ee5f95a9b389e631de"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/17/oop/index.html","9a402172bdb807a20c05d68832feb526"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/03/03/WSLtitle/index.html","f3e78f7707ece2c5974458a49e9211db"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/04/16/baidu/index.html","ba5fd4344c4b16f6a3fed171a0fad99f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/about/index.html","9b69bc3777d6672284760b10d231a084"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/02/index.html","72e14efe2e33380e89dd1d71064c8b89"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/03/index.html","c58b21d8210a8611e07aa03950b39e8a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/04/index.html","ed74900d43c8404d27e9de9158c2661e"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/index.html","b276b1ce4908a9480b6277a38940e764"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/index.html","95eb9b6d1e187423a269e2fc1ec078ee"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/WSL/index.html","481ec6e7fbf3be5e541a4dbf80698506"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/index.html","3c6dead834496add14c5a2d4f45aab29"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/style.css","933ae198446194acc25f560871222484"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/index.html","8c30950aa6efe997c8e94922b61bbb5a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/app.js","ea306851b6276a0ffeec351d138589e5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/valine.js","430596db58e60567246c52c474816ee6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/C/index.html","7a6d59d1c0616975bd8583e2b9a77ec1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Music/index.html","54f9bc8ef74f5d484594d40e42f191c0"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/NET/index.html","74d9df523adab796531da67216ebca81"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/WSL/index.html","6d2bcf75c9dac13f3427a8bbe1d79edb"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Windows/index.html","69688bf83eab1736e752f7458c8226ba"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/index.html","c58ee71121354e027b33d7ca5513144c"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/折腾/index.html","acab4e796687749805a39699bd3f6d32"]];
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







