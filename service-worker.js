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

var precacheConfig = [["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/C/index.html","96648be1a14522688fbda8bf8c543cd4"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/Last-fm/index.html","7abe174d9b5ffd47241c1d8d395d3466"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/17/title/index.html","a83f6c241fa0a4e9b350e51900a995f2"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/03/03/WSLtitle/index.html","81dba268db7e1e825c49c9a4707b17fe"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/03/12/Last-fm/index.html","5b65fc1c869ef2d72b40ee284011dca3"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/04/16/baidu/index.html","e0198e1b977ec0bfe99a6a49dc1495c2"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/about/index.html","1cfab249bca33b831c2c965832ce47b0"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/02/index.html","3ba7374a7ddfcd4d397fc18b9a6000a2"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/03/index.html","3532e02ab81a8c4065b47fa51eaa059d"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/04/index.html","bd6c2fd0973ae860034e228d77f1f189"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/index.html","d23ca21ce2cdda93e432702d5bc288b9"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/index.html","e9762c0dea1f996dc218416e6bd25103"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/index.html","81aecec80437788514bcc929aca25c29"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/404.css","b1bb50e1fabe41adcec483f6427fb3aa"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/index.css","f705533bec2659c29d4117ceaf333753"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/style.css","5595ebc42c6a0274b4d8834bc7093b14"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/favicon.png","cee114bedfc77a8e0735b8bbdb33724f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/avatar(2).jpg","b772626df4da09eb13b6b08e589ff5e9"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/index.html","d71cbc75a2a8a2f12f11d996e05a2b49"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/app.js","ea306851b6276a0ffeec351d138589e5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/copy.js","45aae54bf2e43ac27ecc41eb5e0bacf7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/fancybox.js","f84d626654b9bbc05720952b3effe062"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/head.js","347edd99f8e3921b45fa617e839d8182"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/katex.js","d971ba8b8dee1120ef66744b89cfd2b1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/scroll.js","a12ad7e37b9e325f8da3d0523d3757c7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/canvas-ribbon.js","09c181544ddff1db701db02ac30453e0"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/transition.js","911db4268f0f6621073afcced9e1bfef"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/valine.js","430596db58e60567246c52c474816ee6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/C/index.html","7a35a4df764580d7e4825050b12acf82"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/NET-C-WSL/index.html","f95dc4dc0df7f8ee514e52da413425cf"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Windows/index.html","5f73068941a2d21bb65d678ff95d06aa"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/index.html","3d611f4fac0909bf8f99e508d6bfd418"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/折腾-Music/index.html","6de36f9c183d73f53de5672a253d0c02"]];
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






