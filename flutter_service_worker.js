'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "fa24abf29d036e6c1d06c6fefe066d88",
"assets/AssetManifest.bin.json": "4193d7ee8a353c669bfd99fb52e3f414",
"assets/AssetManifest.json": "946fb4b140ee39c707e7f56ae0d63823",
"assets/assets/fonts/bookman-old-style/BookmanOldStyleBold.ttf": "e6ad3e9485e85796a3ebb481164abee7",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYBLACKITALIC.OTF": "647ad7b734271f858d61a94283fd0502",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYBOLD.OTF": "644563f48ab5fe8e9082b64b2729b068",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYHEAVYITALIC.OTF": "d70a8b7adbe065dd69b16459ffab4231",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYLIGHTITALIC.OTF": "bee8986f3bf3e269e81e7b64996e423c",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYMEDIUM.OTF": "51fd7406327f2b1dbc8e708e6a9da9a5",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYREGULAR.OTF": "aaeac71d99a345145a126a8c9dd2615f",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYSEMIBOLDITALIC.OTF": "fce0a93d0980a16d75a2f71173c80838",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYTHINITALIC.OTF": "9d5ed420ac3a432eb716c670ce00b662",
"assets/assets/fonts/sf-pro-display/SFPRODISPLAYULTRALIGHTITALIC.OTF": "fa570fc4ded697c72608eae4e3675959",
"assets/assets/images/login_pic.jpg": "1bda7a0c9026e33486d53519eac4e720",
"assets/assets/images/logo2.png": "111d2762a203b725e4223f606c0ad1f9",
"assets/assets/pdf/reports/CSS_Report_Template.pdf": "2465c556c7fdc3e18a06675851930b72",
"assets/assets/svg/icons/+.svg": "fb1932803dc44e06ff8fd8d7c4cd5cd7",
"assets/assets/svg/icons/add-item.svg": "44f33f6fa0c226e731bbdc7ce12a51fe",
"assets/assets/svg/icons/audit-log.svg": "99e341c1c92ec0dca42923bcfdf6ecdb",
"assets/assets/svg/icons/check.svg": "4d17981aa33c062f196b7f3019f4ec75",
"assets/assets/svg/icons/cloud-upload.svg": "d03f0f0ab8d5ae5150323e305ad43e0d",
"assets/assets/svg/icons/dashboard.svg": "bb300e98953e6a7c6bf25bc95ad5753a",
"assets/assets/svg/icons/data-management.svg": "49589e953c34466f8732d708330a5ee6",
"assets/assets/svg/icons/display.svg": "fba31d7554f66ac39a40ba2049ca5d35",
"assets/assets/svg/icons/download-bottom.svg": "78a3bdb2e7ec03ca1f975fe814400c4c",
"assets/assets/svg/icons/edit.svg": "2fb4ff8ce8f66b698351f8f8fef0c579",
"assets/assets/svg/icons/entity-management.svg": "3796abc6a60fb922d5b3bede12b41c01",
"assets/assets/svg/icons/file-earmark-bar-graph.svg": "968f2a07abe58f15abca7292e9368a80",
"assets/assets/svg/icons/floppy-disk.svg": "08339e8e2139adaa30a0e89f7704719f",
"assets/assets/svg/icons/input-manually.svg": "907c60b85e98bde1222778b67fb64032",
"assets/assets/svg/icons/lock.svg": "cc8fbdb38a91db2acf95a73e77fd909e",
"assets/assets/svg/icons/page-edit.svg": "d4ce57892705395b975840dae30b860b",
"assets/assets/svg/icons/pencil.svg": "86352aa036e17eb84284663f8d12d5fc",
"assets/assets/svg/icons/profile-circle.svg": "b8ca618fc39c29e214d07b35b1ef8a6b",
"assets/assets/svg/icons/question-mark-rounded.svg": "3b92369e0eafbfaf28ee72feeccd3d7a",
"assets/assets/svg/icons/question-mark.svg": "3b92369e0eafbfaf28ee72feeccd3d7a",
"assets/assets/svg/icons/scan-qr-code.svg": "ae11fb691f62a2efdd781e2c231b8d0b",
"assets/assets/svg/icons/search.svg": "94f3ef83e8700fec3365f4b835fee870",
"assets/assets/svg/icons/share.svg": "bcd423e89b90eb8a596410e8b79077cb",
"assets/assets/svg/icons/sucess.svg": "4d17981aa33c062f196b7f3019f4ec75",
"assets/assets/svg/icons/survey.svg": "ca81afd93b6d933b18b5040be483197b",
"assets/assets/svg/icons/template-management.svg": "fa8168b80b7f315309f7a85bd79e7683",
"assets/assets/svg/icons/trend-analysis-view.svg": "103b00aaa224f56ef482236d3f064dba",
"assets/assets/svg/icons/upload-csv.svg": "8599cd45d19a28b5a730e21e90546cfe",
"assets/assets/svg/icons/user-management.svg": "648da72497e062eb20d1a0a8ffa70be7",
"assets/assets/svg/icons/view-eye.svg": "a12aec44df37c59785c72c17711b0522",
"assets/assets/svg/images/image-1.svg": "22a33dcb9ddd73dae1a5d006491cbc96",
"assets/assets/svg/Logo-SplashScreen.svg": "4394bebc29553ce441e95746d3ba4ede",
"assets/assets/svg/Logo.svg": "05c83935a684f4ac44f142f8e670fd93",
"assets/FontManifest.json": "7f6df22bc0f73ffdd5bdecdcdf53e973",
"assets/fonts/bookman-old-style/BookmanOldStyleBold.ttf": "e6ad3e9485e85796a3ebb481164abee7",
"assets/fonts/MaterialIcons-Regular.otf": "e98c978b6b546258e9302752652ac786",
"assets/fonts/sf-pro-display/SFPRODISPLAYBLACKITALIC.OTF": "647ad7b734271f858d61a94283fd0502",
"assets/fonts/sf-pro-display/SFPRODISPLAYBOLD.OTF": "644563f48ab5fe8e9082b64b2729b068",
"assets/fonts/sf-pro-display/SFPRODISPLAYHEAVYITALIC.OTF": "d70a8b7adbe065dd69b16459ffab4231",
"assets/fonts/sf-pro-display/SFPRODISPLAYLIGHTITALIC.OTF": "bee8986f3bf3e269e81e7b64996e423c",
"assets/fonts/sf-pro-display/SFPRODISPLAYMEDIUM.OTF": "51fd7406327f2b1dbc8e708e6a9da9a5",
"assets/fonts/sf-pro-display/SFPRODISPLAYREGULAR.OTF": "aaeac71d99a345145a126a8c9dd2615f",
"assets/fonts/sf-pro-display/SFPRODISPLAYSEMIBOLDITALIC.OTF": "fce0a93d0980a16d75a2f71173c80838",
"assets/fonts/sf-pro-display/SFPRODISPLAYTHINITALIC.OTF": "9d5ed420ac3a432eb716c670ce00b662",
"assets/fonts/sf-pro-display/SFPRODISPLAYULTRALIGHTITALIC.OTF": "fa570fc4ded697c72608eae4e3675959",
"assets/images/login_pic.jpg": "1bda7a0c9026e33486d53519eac4e720",
"assets/images/logo2.png": "111d2762a203b725e4223f606c0ad1f9",
"assets/NOTICES": "05e55ddb8feb37d0b5627440151292e1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/flutter_dropzone_web/assets/flutter_dropzone.js": "dddc5c70148f56609c3fb6b29929388e",
"assets/packages/syncfusion_flutter_pdfviewer/assets/fonts/RobotoMono-Regular.ttf": "5b04fdfec4c8c36e8ca574e40b7148bb",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/dark/highlight.png": "2aecc31aaa39ad43c978f209962a985c",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/dark/squiggly.png": "68960bf4e16479abb83841e54e1ae6f4",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/dark/strikethrough.png": "72e2d23b4cdd8a9e5e9cadadf0f05a3f",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/dark/underline.png": "59886133294dd6587b0beeac054b2ca3",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/light/highlight.png": "2fbda47037f7c99871891ca5e57e030b",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/light/squiggly.png": "9894ce549037670d25d2c786036b810b",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/light/strikethrough.png": "26f6729eee851adb4b598e3470e73983",
"assets/packages/syncfusion_flutter_pdfviewer/assets/icons/light/underline.png": "a98ff6a28215341f764f96d627a5d0f5",
"assets/pdf/reports/CSS_Report_Template.pdf": "2465c556c7fdc3e18a06675851930b72",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/svg/icons/+.svg": "fb1932803dc44e06ff8fd8d7c4cd5cd7",
"assets/svg/icons/add-item.svg": "44f33f6fa0c226e731bbdc7ce12a51fe",
"assets/svg/icons/audit-log.svg": "99e341c1c92ec0dca42923bcfdf6ecdb",
"assets/svg/icons/cloud-upload.svg": "d03f0f0ab8d5ae5150323e305ad43e0d",
"assets/svg/icons/dashboard.svg": "bb300e98953e6a7c6bf25bc95ad5753a",
"assets/svg/icons/data-management.svg": "49589e953c34466f8732d708330a5ee6",
"assets/svg/icons/display.svg": "fba31d7554f66ac39a40ba2049ca5d35",
"assets/svg/icons/download-bottom.svg": "78a3bdb2e7ec03ca1f975fe814400c4c",
"assets/svg/icons/edit.svg": "2fb4ff8ce8f66b698351f8f8fef0c579",
"assets/svg/icons/entity-management.svg": "3796abc6a60fb922d5b3bede12b41c01",
"assets/svg/icons/file-earmark-bar-graph.svg": "968f2a07abe58f15abca7292e9368a80",
"assets/svg/icons/floppy-disk.svg": "08339e8e2139adaa30a0e89f7704719f",
"assets/svg/icons/input-manually.svg": "907c60b85e98bde1222778b67fb64032",
"assets/svg/icons/page-edit.svg": "d4ce57892705395b975840dae30b860b",
"assets/svg/icons/pencil.svg": "86352aa036e17eb84284663f8d12d5fc",
"assets/svg/icons/question-mark.svg": "3b92369e0eafbfaf28ee72feeccd3d7a",
"assets/svg/icons/scan-qr-code.svg": "ae11fb691f62a2efdd781e2c231b8d0b",
"assets/svg/icons/search.svg": "94f3ef83e8700fec3365f4b835fee870",
"assets/svg/icons/share.svg": "bcd423e89b90eb8a596410e8b79077cb",
"assets/svg/icons/sucess.svg": "4d17981aa33c062f196b7f3019f4ec75",
"assets/svg/icons/survey.svg": "ca81afd93b6d933b18b5040be483197b",
"assets/svg/icons/template-management.svg": "fa8168b80b7f315309f7a85bd79e7683",
"assets/svg/icons/trend-analysis-view.svg": "103b00aaa224f56ef482236d3f064dba",
"assets/svg/icons/upload-csv.svg": "8599cd45d19a28b5a730e21e90546cfe",
"assets/svg/icons/user-management.svg": "648da72497e062eb20d1a0a8ffa70be7",
"assets/svg/icons/view-eye.svg": "a12aec44df37c59785c72c17711b0522",
"assets/svg/images/image-1.svg": "22a33dcb9ddd73dae1a5d006491cbc96",
"assets/svg/Logo-SplashScreen.svg": "4394bebc29553ce441e95746d3ba4ede",
"assets/svg/Logo.svg": "05c83935a684f4ac44f142f8e670fd93",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "24306ed1d2f5c618b12a6df3c89b5ab2",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "f91c899b2529a95c65390163608634e4",
"/": "f91c899b2529a95c65390163608634e4",
"main.dart.js": "de4dca65cd591a162c3f3f50500c1d6e",
"manifest.json": "c1bbcf3616057facab2d6b4cae461813",
"version.json": "3c5c44abf4bf15745c665470d7d493c5"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
