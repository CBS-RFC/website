/**
 * build-store.js — generates store.html from the product list below.
 * Run:  node scripts/build-store.js
 * Edit the `products` array to add/remove/change merchandise, then re-run.
 * Buy Now buttons are placeholders; set BUY_URL (or per-product `buyUrl`) when the checkout link is ready.
 */
const fs = require('fs');
const path = require('path');

const BUY_URL = '#'; // TODO: replace with the real store / order form link
const AV = 'https://www.apparelvideos.com/cs/CatalogBrowser?todo=mm&productId=';
const CC = 'https://catalog.companycasuals.com/p/';

const products = [
  { slug: 'practice-tee', name: 'Short Sleeve Practice T-Shirt', images: 4,
    sizing: AV + '5000',
    desc: ['5.3-ounce, 100% US cotton', 'Non-topstitched, classic width, rib collar', 'Taped neck and shoulders', 'Classic fit, seamless body', 'Recycled, high-performing black tear-away label'] },
  { slug: 'turf-eater', name: 'Turf Eater', images: 2,
    sizing: CC + '790_TrueNavy/specSheetMeasurements',
    desc: ['6.1-ounce, 100% US ring spun cotton', 'Soft-washed, garment-dyed fabric', 'Double-needle collar and bottom hems', 'Twill-taped neck and shoulders', 'Twill label', 'Rib knit cuffs', 'Relaxed fit, seamless body'] },
  { slug: 'off-duty-pants', name: 'Off Duty Pants', images: 2,
    sizing: CC + '4125_VtgHtr/specSheetMeasurements',
    desc: ['9-ounce, 65/35 ring spun combed cotton/poly fleece', 'Elastic waistband with drawcord', 'Front slash pockets', 'Open hem cuffs'] },
  { slug: 'washed-up', name: 'Washed Up But Trying', images: 3,
    sizing: AV + 'CJ1611',
    desc: ['8.2-ounce, 80/20 cotton/polyester with a 100% cotton hood lining', 'Jersey-lined, 3-panel hood with dyed-to-match drawstrings', 'Rib knit cuffs and hem', 'Front pouch pocket', 'Contrast embroidered Swoosh logo on left chest'] },
  { slug: 'dads-sweatshirt', name: 'Dad\u2019s Old MBA Sweatshirt', images: 4,
    sizing: AV + 'PC78',
    desc: ['7.8-ounce, 50/50 cotton/poly fleece', 'Air jet yarn for softness', 'Removable tag for comfort and relabeling'] },
  { slug: 'dawg-of-the-merch', name: 'Dawg of the Merch', images: 2,
    sizing: CC + '23373_NewNavy/specSheetMeasurements',
    blurb: 'We have a dawg of the match award \u2014 and this is what they wear when they aren\u2019t toppling Wharton Wimps.',
    desc: ['Durable 5.75-ounce, 65/35 cotton/poly stretch plaited jersey knit', 'Carhartt Force\u00AE technology wicks sweat, dries fast and fights odors', 'FastDry\u00AE technology keeps you cool for all-day comfort and UPF 25+', 'Raglan sleeves to increase range of motion', 'Contrast color neck tape and tagless neck label', 'Smooth flatlock seams'] },
  { slug: 'bankers-classic', name: 'The Banker\u2019s Classic', images: 3,
    sizing: AV + 'J903',
    blurb: 'Insulation and stretch soft shell side panels make this vest a versatile, flattering and cozy cold-weather layer.',
    desc: ['100% polyester woven shell', '100% polyester printed lining with 100% polyfill insulation behind the outer quilted woven shell', '100% polyester knit bonded to a water-resistant film insert and a 100% polyester microfleece lining at side panels and under arms', 'Can be zipped in and secured by snap attachments inside an outer Collective layer', 'Molded center front zipper', 'Stretch side panels', 'Open front pockets and Port Pocket\u2122 for decoration access'] },
  { slug: 'sideline-snuggie', name: 'The Sideline Snuggie', images: 3,
    sizing: AV + 'JST55',
    desc: ['100% polyester with waterproof coating', '3.5-ounce polyfill insulation in body', '3-ounce polyfill insulation in hood and sleeves', '5000MM fabric waterproof rating', '3000 g/m\u00B2 fabric breathability rating', 'Critically seam-sealed', '3-panel insulated hood with drawcord and toggles', '7 button snaps on center placket', 'Interior left chest pocket', 'Decoration access pocket', 'Side pockets with hidden snaps'] },
  { slug: 'last-bag', name: 'Last Bag You Ever Buy', images: 3,
    sizing: 'https://www.apparelvideos.com/cs/CatalogBrowser?todo=ss&productId=NKFN4208',
    desc: ['100% polyester with PU coating for durability', 'Constructed of at least 65% recycled material', 'Two-way zippered main body with interior mesh slip pocket', 'Zippered end pocket for shoes or soiled items', 'Thermal insulated zippered end pocket for supplements or hydration', 'Contrast welded Swoosh logo', 'Dimensions: 22"l x 11"w x 12"h', 'Capacity: 3,112 cu. in./51 L'] },
  { slug: 'scrum-cap', name: 'Scrum Cap (But Cooler)', images: 2,
    sizing: null,
    desc: ['100% cotton, garment-washed twill', 'Unstructured, six-panel, low-profile', 'Pre-curved visor', '\u201947 snap slide buckle closure', 'One Size Fits All'] },
  { slug: 'cold-but-committed', name: 'Cold But Committed', images: 2,
    sizing: CC + '7695_RoyalGrey/specSheetMeasurements',
    blurb: 'With its heather stripes, dual-colored pom and warm fleece lining, this is the beanie frequently spotted on pro football players and fans. A tonal embroidered New Era flag adds subtle character.',
    desc: ['100% acrylic shell', '90/10 polyester/wool fleece lining'] },
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function card(p, idx) {
  const imgs = Array.from({ length: p.images }, (_, i) => `assets/images/store/${p.slug}-${i + 1}.jpg`);
  const thumbs = imgs.length > 1 ? `
            <div class="grid grid-cols-${Math.min(imgs.length, 4)} gap-2 mt-2">
${imgs.map((src, i) => `              <button type="button" class="store-thumb border-2 ${i === 0 ? 'border-tertiary-container' : 'border-transparent'} overflow-hidden focus:outline-none" data-src="${src}" aria-label="${esc(p.name)} photo ${i + 1}">
                <img src="${src}" alt="" loading="lazy" class="w-full aspect-[2/1] object-cover"/>
              </button>`).join('\n')}
            </div>` : '';
  const buy = p.buyUrl || BUY_URL;
  return `        <article class="bg-white border border-surface-container-highest flex flex-col" data-animate${idx % 2 ? ' data-animate-delay="100"' : ''}>
          <div class="p-3 bg-surface-container-low">
            <img src="${imgs[0]}" alt="${esc(p.name)}" loading="lazy" class="store-main w-full aspect-[2/1] object-cover"/>${thumbs}
          </div>
          <div class="p-8 flex flex-col flex-1">
            <h3 class="font-bebas-neue text-4xl text-primary uppercase leading-none mb-1">${esc(p.name)}</h3>
            <div class="h-1 w-12 bg-tertiary-container mb-5"></div>
            <h4 class="font-barlow-condensed font-bold uppercase tracking-[0.2em] text-sm text-outline mb-3">Product Description</h4>${p.blurb ? `
            <p class="font-manrope text-on-surface-variant leading-relaxed mb-3">${esc(p.blurb)}</p>` : ''}
            <ul class="font-manrope text-on-surface-variant leading-relaxed space-y-1 mb-6 list-disc pl-5 marker:text-tertiary-container">
${p.desc.map(d => `              <li>${esc(d)}</li>`).join('\n')}
            </ul>
            <div class="mt-auto flex flex-wrap items-center gap-4">
              <a href="${buy}" data-buy-placeholder class="bg-primary text-white font-bebas-neue text-2xl px-8 py-3 uppercase tracking-wide hover:bg-tertiary-container hover:text-primary transition-colors duration-300">Buy Now</a>${p.sizing ? `
              <a href="${esc(p.sizing)}" target="_blank" rel="noopener" class="font-barlow-condensed font-bold uppercase tracking-widest text-sm text-secondary hover:text-primary transition-colors">Sizing Guide →</a>` : ''}
            </div>
          </div>
        </article>`;
}

const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="CBS RFC Team Store — practice tees, hoodies, outerwear, bags and headwear for players, alumni and fans."/>
  <meta property="og:title" content="Team Store | CBS RFC"/>
  <meta property="og:description" content="Gear up with official CBS Rugby FC team apparel."/>
  <meta property="og:image" content="assets/images/og-image.jpg"/>
  <meta property="og:type" content="website"/>
  <title>Team Store | CBS RFC</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="assets/css/main.css"/>
  <link rel="icon" href="assets/images/logo/cbs-rfc-crest.png"/>
</head>
<body class="bg-surface text-on-surface selection:bg-tertiary-container selection:text-on-surface overflow-x-hidden">

  <div id="nav-placeholder"></div>

  <main class="pt-[68px]">

    <!-- Hero -->
    <section class="relative bg-primary py-24 px-8 overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-surface-container-highest pointer-events-none"></div>
      <div class="relative max-w-5xl mx-auto text-center" data-animate>
        <h1 class="font-bebas-neue text-6xl md:text-8xl text-white tracking-tight leading-none mb-6">
          TEAM <span class="text-tertiary-container">STORE</span>
        </h1>
        <p class="font-barlow-condensed text-xl md:text-2xl text-white/80 uppercase tracking-widest max-w-2xl mx-auto mb-10">
          Official CBS Rugby FC gear for players, alumni and fans.
        </p>
        <a href="${BUY_URL}" data-buy-placeholder class="inline-block bg-tertiary-container text-primary font-bebas-neue text-3xl px-12 py-4 uppercase tracking-wide hover:bg-white transition-colors duration-300">Buy Now</a>
      </div>
    </section>

    <!-- Products -->
    <section class="py-24 px-8 bg-surface">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16" data-animate>
          <h2 class="font-bebas-neue text-5xl md:text-7xl text-primary uppercase leading-none">The Collection</h2>
          <div class="h-1 w-24 bg-tertiary-container mx-auto mt-4"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
${products.map(card).join('\n')}
        </div>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>

  <script src="assets/js/animations.js"></script>
  <script src="assets/js/nav.js"></script>
  <script src="assets/js/content-loader.js"></script>
  <script>
    // Thumbnail gallery: swap the main photo on click
    document.querySelectorAll('.store-thumb').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('article');
        card.querySelector('.store-main').src = btn.dataset.src;
        card.querySelectorAll('.store-thumb').forEach(function (b) {
          b.classList.toggle('border-tertiary-container', b === btn);
          b.classList.toggle('border-transparent', b !== btn);
        });
      });
    });
    // Buy Now is a placeholder until the checkout link is configured
    document.querySelectorAll('[data-buy-placeholder]').forEach(function (a) {
      if (a.getAttribute('href') === '#') a.addEventListener('click', function (e) { e.preventDefault(); });
    });
  </script>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'store.html'), html);
console.log('store.html written (' + products.length + ' products)');

