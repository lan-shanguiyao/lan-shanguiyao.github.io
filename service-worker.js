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

var precacheConfig = [["F:/Blog/public/2020/02/07/C/index.html","e74e71ebea2ee39aea7dcabf4aca8816"],["F:/Blog/public/2020/02/07/Last-fm/index.html","87758500196fbcc8964d8b0e8ad6e5e0"],["F:/Blog/public/2020/02/17/oop/index.html","ec902e924f8f0ef8126c5f1fea9232d7"],["F:/Blog/public/2020/03/03/WSLtitle/index.html","552034623432a41d4dfde081769927db"],["F:/Blog/public/2020/04/16/baidu/index.html","0ee58ef60fbcc07ae5fde5f880ffc5e6"],["F:/Blog/public/2020/07/06/leetcode-9-回文数/index.html","cafa741db0d8e53d9198d3ba9bdc3083"],["F:/Blog/public/2020/07/07/leetcode-1-两数之和/index.html","7002184ffc98205e9ca258d88cbbdefe"],["F:/Blog/public/2020/07/10/leetcode-27-移除元素/index.html","aff0557de2e0070ee2342ae7886c8afd"],["F:/Blog/public/2020/08/13/Install-SQL-Server-on-VPS/index.html","44a84850e454de73d514f2cceea4f43b"],["F:/Blog/public/about/index.html","aa02852170c30a7d7f8456078548f313"],["F:/Blog/public/archives/2020/02/index.html","8f792b04e2e89e1d43a6b860e850b54f"],["F:/Blog/public/archives/2020/03/index.html","91999d7b665a67aa570c6926f50c204e"],["F:/Blog/public/archives/2020/04/index.html","e04dc8361cb30d74b3b5a06eef9b0407"],["F:/Blog/public/archives/2020/07/index.html","3bea50596d4835b90415bdb3d3ce157e"],["F:/Blog/public/archives/2020/08/index.html","be76e070cd2732127dec517f07cb3791"],["F:/Blog/public/archives/2020/index.html","d4e29794c36f0eed7c9d799adac8401a"],["F:/Blog/public/archives/index.html","737ca10b90f755ac4b497c3f7f91d9f6"],["F:/Blog/public/categories/WSL/index.html","f45b03c1b5ac15dfbc55f572925865f7"],["F:/Blog/public/categories/index.html","0188e630815b1c63f2dc69897a4ce031"],["F:/Blog/public/categories/leetcode/index.html","2cf422035fe4916cb03263b26691d0d9"],["F:/Blog/public/categories/数据库/index.html","11c4df05e43b82202cbd82dd2b99a552"],["F:/Blog/public/css/style.css","933ae198446194acc25f560871222484"],["F:/Blog/public/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["F:/Blog/public/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["F:/Blog/public/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["F:/Blog/public/index.html","ddf401121cfde54f7f70278f22f12f03"],["F:/Blog/public/js/app.js","ea306851b6276a0ffeec351d138589e5"],["F:/Blog/public/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["F:/Blog/public/js/valine.js","430596db58e60567246c52c474816ee6"],["F:/Blog/public/page/2/index.html","7ae229ed1cf45517f6eac440376d140d"],["F:/Blog/public/tags/C/index.html","c0eff65d40016aaeae2144618a696b94"],["F:/Blog/public/tags/Music/index.html","6530624956097ca251acc2e190d7c613"],["F:/Blog/public/tags/NET/index.html","288ac7cb1ae6051d19d72b63b99517f1"],["F:/Blog/public/tags/WSL/index.html","660f7a9d27c16060b0bdf228d17671f9"],["F:/Blog/public/tags/Windows/index.html","feeb5947635ab5dc4eb148127bb0e3de"],["F:/Blog/public/tags/index.html","245f3faa87bca3be8a27dc86cd2845a4"],["F:/Blog/public/tags/leetcode/index.html","ce87ffb2a35537d678557a5deea9277f"],["F:/Blog/public/tags/折腾/index.html","6f75ee10707fd71be36aa6963ac7d771"],["F:/Blog/public/tags/数据库/index.html","d8a767dced3581cb3dba7b225a3a00b5"],["F:/Blog/public/tags/题解/index.html","3173c3dd770f16f52eb1a0fdc6787798"]];
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







