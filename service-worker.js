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

var precacheConfig = [["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/C/index.html","4426cc40cd8801e0a626f9a2c41e913a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/07/Last-fm/index.html","5ce57683d6337a5f736439acdd80957c"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/02/17/oop/index.html","d045d14291dbededc13ae72d46fc9c88"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/03/03/WSLtitle/index.html","2959c8d220d8ae8104c4b0d905263531"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/03/12/Last-fm/index.html","5b65fc1c869ef2d72b40ee284011dca3"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/2020/04/16/baidu/index.html","f88cc1d094474806454bafeb2fc95d17"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/about/index.html","24f1ce408e1e2805ded1335acd103c8b"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/02/index.html","41e5abdad0d19af961220e272cfb3bd0"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/03/index.html","be0b7abe28353613629b0e078562cf1c"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/04/index.html","474b98185c8517f5ab33acc7b2d41486"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/2020/index.html","5839991fc8f64b96ec8a7ffbb1cb4396"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/archives/index.html","7c684b99b5723741087ab06026e800ff"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/WSL/index.html","1d54995457d1fb468b3e8622c9548c73"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/categories/index.html","315682398ff628f4aef401d8999b17f9"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/404.css","b1bb50e1fabe41adcec483f6427fb3aa"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/index.css","f705533bec2659c29d4117ceaf333753"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/style.css","5595ebc42c6a0274b4d8834bc7093b14"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/favicon.png","cee114bedfc77a8e0735b8bbdb33724f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/avatar(2).jpg","b772626df4da09eb13b6b08e589ff5e9"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/index.html","95add23b4543a1bae58d922a0f5e7893"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/app.js","ea306851b6276a0ffeec351d138589e5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/copy.js","45aae54bf2e43ac27ecc41eb5e0bacf7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/fancybox.js","f84d626654b9bbc05720952b3effe062"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/head.js","347edd99f8e3921b45fa617e839d8182"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/katex.js","d971ba8b8dee1120ef66744b89cfd2b1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/scroll.js","a12ad7e37b9e325f8da3d0523d3757c7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/canvas-ribbon.js","09c181544ddff1db701db02ac30453e0"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/transition.js","911db4268f0f6621073afcced9e1bfef"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/js/valine.js","430596db58e60567246c52c474816ee6"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/C/index.html","6575c8d3e9c382d95b8a739e15f104c2"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Music/index.html","d16e5842b02ecdfaaccabd695126630f"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/NET/index.html","92ad14ae22cd10a70a63876cdbf97c9e"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/WSL/index.html","4f78c169a697098faeca23b0ec341ef3"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/Windows/index.html","7f1b91c38c07588d57eb8b9e4dcae1e4"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/index.html","bd954da8319543dd22b19ac923f1a854"],["C:/Users/bixue/OneDrive/Cloud_System/Blog/public/tags/折腾/index.html","815887d5788868053d492dcdc1afddf3"]];
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







