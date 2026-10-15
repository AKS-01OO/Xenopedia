const { universes, planets, civilizations, entries, rankings } = window.XenopediaData;
const appEl = document.getElementById('app');

const state = {
  lastQuery: '',
  selectedGraphEntry: entries[0]?.id || '',
};

function getUniverseById(id) {
  return universes.find((entry) => entry.id === id) || null;
}

function getEntryById(id) {
  return entries.find((entry) => entry.id === id) || null;
}

function getWorldName(universeId) {
  const universe = getUniverseById(universeId);
  return universe ? universe.name : 'Unknown universe';
}

function getIllustration(universeId, variant = 'card') {
  const universe = getUniverseById(universeId);
  if (!universe?.image) return '';

  const alt = `Illustrative space scene for the ${universe.name} archive; not official franchise artwork`;
  return `<img class="illustration illustration--${variant}" src="${universe.image}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.hidden=true" />`;
}

const creatureIllustrations = {
  heatblast: 'creature-ember.svg',
  'four-arms': 'creature-celestial.svg',
  xlr8: 'creature-electric.svg',
  diamondhead: 'creature-crystal.svg',
  goku: 'creature-celestial.svg',
  vegeta: 'creature-celestial.svg',
  piccolo: 'creature-verdant.svg',
  frieza: 'creature-aquatic.svg',
  yoda: 'creature-verdant.svg',
  chewbacca: 'creature-verdant.svg',
  'darth-vader': 'creature-machine.svg',
  superman: 'creature-celestial.svg',
  'martian-manhunter': 'creature-verdant.svg',
  cyborg: 'creature-machine.svg',
  'optimus-prime': 'creature-machine.svg',
  bumblebee: 'creature-electric.svg',
  megatron: 'creature-machine.svg',
  pikachu: 'creature-electric.svg',
  mewtwo: 'creature-celestial.svg',
  charizard: 'creature-ember.svg',
  lugia: 'creature-aquatic.svg',
  wolverine: 'creature-verdant.svg',
  'doctor-strange': 'creature-celestial.svg',
  groot: 'creature-verdant.svg',
};

const planetIllustrations = {
  pyros: 'planet-volcanic.svg',
  namek: 'planet-terrestrial.svg',
  krypton: 'planet-terrestrial.svg',
  cybertron: 'planet-mechanical.svg',
  alola: 'planet-ocean.svg',
  endor: 'planet-terrestrial.svg',
  hoth: 'planet-frozen.svg',
};

function getCreatureIllustration(entry, variant = 'card') {
  const fallback = `assets/illustrations/${creatureIllustrations[entry.id] || 'creature-celestial.svg'}`;
  const image = entry.image || fallback;
  const alt = entry.image
    ? `Dataset image for ${entry.name}; see the entry source for dataset details`
    : `Original ${entry.species || 'alien'} creature illustration for ${entry.name}; not official franchise artwork`;
  return `<img class="illustration illustration--${variant}" src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

function getPlanetIllustration(planet, variant = 'planet') {
  const image = planetIllustrations[planet.id];
  if (!image) return '';

  return `<img class="illustration illustration--${variant}" src="assets/illustrations/${image}" alt="Illustrative ${escapeHtml(planet.type.toLowerCase())} landscape for ${escapeHtml(planet.name)}; not official franchise artwork" loading="lazy" />`;
}

function searchEntries(query = '') {
  const value = (query || '').trim().toLowerCase();
  if (!value) {
    return entries;
  }

  return entries.filter((entry) => {
    const haystack = [
      entry.name,
      entry.species,
      entry.homePlanet,
      entry.type,
      entry.summary,
      entry.description,
      getWorldName(entry.universeId),
      ...(entry.attributes?.abilities || []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(value);
  });
}

function formatTags(values) {
  if (!values || !values.length) {
    return '<span class="tag">Not documented</span>';
  }
  return values.map((value) => `<span class="tag">${value}</span>`).join('');
}

function safeValue(value, fallback = 'Not documented') {
  return value && value !== 'Unknown' && value !== 'N/A' ? value : fallback;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function routeFromHash() {
  const hash = (window.location.hash || '#/').replace(/^#/, '');
  const path = hash.startsWith('/') ? hash : `/${hash}`;
  return path || '/';
}

function navigateTo(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  window.location.hash = `#${normalized}`;
}

function renderHero(searchValue = '') {
  const suggestions = searchEntries(searchValue).slice(0, 5);

  return `
    <section class="hero">
      <div class="container hero__panel">
        <div class="hero__content">
          <div>
            <span class="hero__eyebrow">Deep space archive</span>
            <h1>The Universe Is Bigger Than You Know.</h1>
            <p>Explore extraterrestrial life, discover distant civilizations, compare species across universes, and investigate the possibilities of interspecies coexistence.</p>
            <div class="search-box">
              <span class="search-icon">⌕</span>
              <input id="global-search" type="search" value="${escapeHtml(searchValue)}" placeholder="Search aliens, planets, species, civilizations..." aria-label="Global search" />
              <div id="search-suggestions" class="search-suggestions ${searchValue ? 'visible' : ''}">
                ${suggestions
                  .map(
                    (entry) => `
                      <button type="button" data-entry-id="${entry.id}">
                        ${entry.name} · ${getWorldName(entry.universeId)}
                      </button>
                    `
                  )
                  .join('') || '<button type="button" disabled>No matching records</button>'}
              </div>
            </div>
          </div>
          <div class="hero__stats">
            <div class="stat-pill"><strong>7</strong> supported universes</div>
            <div class="stat-pill"><strong>${entries.length}</strong> encyclopedia entries</div>
            <div class="stat-pill"><strong>4</strong> interactive analysis tools</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDiscovery() {
  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Discovery index</h2>
        </div>
        <div class="discovery-grid">
          <article class="card discovery-card">
            <div class="discovery-card__meta">#01</div>
            <h3>Cosmic Top 10</h3>
            <ul class="discovery-list">
              ${rankings.cosmicTop10
                .slice(0, 4)
                .map(
                  (item) => `
                  <li><strong>${item.rank}. ${item.name}</strong><span>${getWorldName(item.universeId)}</span></li>
                  `
                )
                .join('')}
            </ul>
          </article>

          <article class="card discovery-card">
            <div class="discovery-card__meta">#02</div>
            <h3>Trending Aliens</h3>
            <ul class="discovery-list">
              ${rankings.trending
                .map(
                  (item) => `
                  <li class="discovery-item">${getCreatureIllustration(entries.find((entry) => entry.name === item.name) || {}, 'thumb')}<strong>${item.name}</strong><span>${item.delta}</span></li>
                  `
                )
                .join('')}
            </ul>
          </article>

          <article class="card discovery-card">
            <div class="discovery-card__meta">#03</div>
            <h3>Most Compared</h3>
            <ul class="discovery-list">
              ${rankings.compared
                .slice(0, 4)
                .map(
                  (item) => `
                  <li><strong>${item.name}</strong><span>${item.count}</span></li>
                  `
                )
                .join('')}
            </ul>
          </article>

          <article class="card discovery-card">
            <div class="discovery-card__meta">#04</div>
            <h3>Most Explored Planets</h3>
            <ul class="discovery-list">
              ${rankings.exploredPlanets
                .map(
                  (item) => `
                  <li><strong>${item.name}</strong><span>${item.visits} visits</span></li>
                  `
                )
                .join('')}
            </ul>
          </article>

          <article class="card discovery-card">
            <div class="discovery-card__meta">#05</div>
            <h3>Recently Added</h3>
            <ul class="discovery-list">
              ${entries
                .slice()
                .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                .slice(0, 4)
                .map(
                  (item) => `
                  <li><strong>${item.name}</strong><span>${item.addedAt}</span></li>
                  `
                )
                .join('')}
            </ul>
          </article>

          <article class="card discovery-card">
            <div class="discovery-card__meta">#06</div>
            <h3>Featured Discoveries</h3>
            <ul class="discovery-list">
              <li><strong>Heatblast</strong><span>Pyronite</span></li>
              <li><strong>Goku</strong><span>Saiyan</span></li>
              <li><strong>Yoda</strong><span>Force-sensitive</span></li>
              <li><strong>Mewtwo</strong><span>Genetic anomaly</span></li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderUniverseIndex() {
  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Universe explorer</h2>
          <a href="#/encyclopedia" class="link-chip">Open encyclopedia →</a>
        </div>

        <div class="universe-grid">
          ${universes
            .map(
              (universe) => `
                <article class="card universe-card">
                  ${getIllustration(universe.id, 'universe')}
                  <div class="universe-card__meta">${universe.tagline}</div>
                  <h3>${universe.name}</h3>
                  <p>${universe.description}</p>
                  <div class="article-card__tags">
                    ${formatTags(universe.featured.map((id) => getEntryById(id)?.name || id))}
                  </div>
                  <p><a href="#/universes/${universe.id}" class="universe-card__cta primary-btn">Open ${universe.name} →</a></p>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFeatureShowcase() {
  const features = [
    { title: 'Encyclopedia', icon: '⌘', text: 'Browse entries, search by type, and explore each lore profile.' },
    { title: 'Comparison Engine', icon: '⇄', text: 'Compare attributes from different universes with transparent scoring.' },
    { title: 'Colony Simulator', icon: '◎', text: 'Model fictional habitat compatibility and reveal conflict points.' },
    { title: 'Knowledge Graph', icon: '◈', text: 'Trace relationships between species, planets, abilities, and civilizations.' },
  ];

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Feature showcase</h2>
        </div>
        <div class="feature-grid">
          ${features
            .map(
              (feature) => `
                <article class="card feature-card">
                  <div class="feature-icon">${feature.icon}</div>
                  <h3>${feature.title}</h3>
                  <p>${feature.text}</p>
                  <a href="#/encyclopedia" class="secondary-btn">Explore feature</a>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHomePage() {
  return `
    ${renderHero()}
    ${renderDiscovery()}
    ${renderUniverseIndex()}
    ${renderFeatureShowcase()}
  `;
}

function renderEncyclopediaPage() {
  const searchTerm = document.getElementById('encyclopedia-search')?.value || '';
  const universeId = document.getElementById('universe-filter')?.value || 'all';
  const type = document.getElementById('type-filter')?.value || 'all';
  const sort = document.getElementById('sort-filter')?.value || 'popular';

  let shown = [...searchEntries(searchTerm)];

  if (universeId !== 'all') {
    shown = shown.filter((entry) => entry.universeId === universeId);
  }

  if (type !== 'all') {
    shown = shown.filter((entry) => entry.type === type);
  }

  if (sort === 'name') {
    shown.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'recent') {
    shown.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  } else {
    shown.sort((a, b) => b.viewCount - a.viewCount);
  }

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Encyclopedia</h2>
          <a href="#/" class="link-chip">Back to home</a>
        </div>

        <div class="filter-row">
          <input id="encyclopedia-search" type="search" value="${escapeHtml(searchTerm)}" placeholder="Search entries..." aria-label="Entry search" />
          <select id="universe-filter" aria-label="Universe filter">
            <option value="all" ${universeId === 'all' ? 'selected' : ''}>All universes</option>
            ${universes.map((u) => `<option value="${u.id}" ${universeId === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
          </select>
          <select id="type-filter" aria-label="Type filter">
            <option value="all" ${type === 'all' ? 'selected' : ''}>All entry types</option>
            <option value="alien" ${type === 'alien' ? 'selected' : ''}>Alien</option>
            <option value="character" ${type === 'character' ? 'selected' : ''}>Character</option>
            <option value="creature" ${type === 'creature' ? 'selected' : ''}>Creature</option>
          </select>
          <select id="sort-filter" aria-label="Sort entries">
            <option value="popular" ${sort === 'popular' ? 'selected' : ''}>Popularity</option>
            <option value="name" ${sort === 'name' ? 'selected' : ''}>Name</option>
            <option value="recent" ${sort === 'recent' ? 'selected' : ''}>Recently added</option>
          </select>
        </div>

        <div class="card-grid">
          ${shown.length
            ? shown
                .map(
                  (entry) => `
                    <article class="card article-card">
                      <div>
                        ${getCreatureIllustration(entry, 'card')}
                        <div class="article-card__meta">
                          <span>${getWorldName(entry.universeId)}</span>
                          <span>${entry.type}</span>
                        </div>
                        <h3>${entry.name}</h3>
                        <p>${entry.summary}</p>
                        <div class="article-card__tags">${formatTags([entry.species, entry.homePlanet])}</div>
                      </div>
                      <div class="article-card__meta">
                        <span>${entry.viewCount} views</span>
                        <a href="#/articles/${entry.id}" class="inline-btn">Read article</a>
                      </div>
                    </article>
                  `
                )
                .join('')
            : '<div class="empty-state">No matching articles were found for the current filters.</div>'}
        </div>
      </div>
    </section>
  `;
}

function renderUniversePage(universeId) {
  const universe = getUniverseById(universeId);
  if (!universe) return renderNotFound();

  const members = entries.filter((entry) => entry.universeId === universeId);
  const relatedPlanets = planets.filter((planet) => planet.universeId === universeId);
  const relatedCivilizations = civilizations.filter((civ) => civ.universeId === universeId);

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">${universe.name}</h2>
          <a href="#/universes" class="link-chip">All universes</a>
        </div>

        <article class="card article-card">
          <div>
            ${getIllustration(universe.id, 'banner')}
            <div class="article-card__meta">
              <span>${universe.tagline}</span>
            </div>
            <h3>Universe overview</h3>
            <p>${universe.description}</p>
          </div>
        </article>

        <div class="card-grid" style="margin-top: 20px;">
          <div class="card article-card">
            <div>
              <h3>Featured aliens</h3>
              <ul class="meta-list">
                ${universe.featured
                  .map((id) => {
                    const entry = getEntryById(id);
                    return entry ? `<li><strong>${entry.name}</strong><span>${entry.species}</span></li>` : '';
                  })
                  .join('')}
              </ul>
            </div>
          </div>

          <div class="card article-card">
            <div>
              <h3>Planet atlas</h3>
              <ul class="meta-list">
                ${relatedPlanets.map((planet) => `<li><strong>${planet.name}</strong><span>${planet.type}</span></li>`).join('') || '<li><strong>No planets documented</strong></li>'}
              </ul>
            </div>
          </div>

          <div class="card article-card">
            <div>
              <h3>Civilizations</h3>
              <ul class="meta-list">
                ${relatedCivilizations.map((civ) => `<li><strong>${civ.name}</strong><span>${civ.summary}</span></li>`).join('') || '<li><strong>No civilizations listed</strong></li>'}
              </ul>
            </div>
          </div>
        </div>

        <div class="section__head" style="margin-top: 28px;">
          <h3 class="section__title">Popular entries</h3>
        </div>
        <div class="card-grid">
          ${members
            .slice()
            .sort((a, b) => b.viewCount - a.viewCount)
            .slice(0, 6)
            .map(
              (entry) => `
                <article class="card article-card">
                  <div>
                    ${getCreatureIllustration(entry, 'card')}
                    <div class="article-card__meta"><span>${entry.species}</span><span>${entry.type}</span></div>
                    <h3>${entry.name}</h3>
                    <p>${entry.summary}</p>
                  </div>
                  <div class="article-card__meta">
                    <span>${entry.viewCount} views</span>
                    <a href="#/articles/${entry.id}" class="inline-btn">Open article</a>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderArticlePage(entryId) {
  const entry = getEntryById(entryId);
  if (!entry) return renderNotFound();

  const attr = entry.attributes || {};
  const relatedEntries = entries.filter(
    (candidate) =>
      candidate.id !== entry.id &&
      (candidate.universeId === entry.universeId || candidate.species === entry.species || candidate.homePlanet === entry.homePlanet)
  ).slice(0, 4);

  const sections = [
    {
      title: 'Overview',
      content: entry.description,
      value: entry.summary,
    },
    {
      title: 'Appearance',
      content: safeValue(attr.biology),
      value: safeValue(attr.communication),
    },
    {
      title: 'Species and classification',
      content: safeValue(entry.species),
      value: safeValue(entry.type),
    },
    {
      title: 'Abilities',
      content: attr.abilities ? attr.abilities.join(', ') : 'Not documented',
      value: safeValue(attr.environment),
    },
    {
      title: 'Home planet and habitat',
      content: safeValue(entry.homePlanet),
      value: safeValue(entry.habitat),
    },
    {
      title: 'Communication and intelligence',
      content: safeValue(attr.communication),
      value: safeValue(attr.intelligence),
    },
    {
      title: 'Known limitations',
      content: attr.limitations ? attr.limitations.join(', ') : 'Not documented',
      value: safeValue(entry.source),
    },
  ];

  return `
    <section class="section">
      <div class="container article-layout">
        <article class="article-panel">
          ${getCreatureIllustration(entry, 'article')}
          <div class="article-card__meta">
            <span>${getWorldName(entry.universeId)}</span>
            <span>${entry.type}</span>
          </div>
          <h1>${entry.name}</h1>
          <p class="article-panel__intro">${entry.summary}</p>
          ${entry.sources?.length
            ? `<p style="margin: 12px 0 20px; color: var(--muted);">Dataset: ${entry.sources
              .map((source) => `<a href="${escapeHtml(source.datasetUrl)}" target="_blank" rel="noreferrer">${escapeHtml(source.datasetName)}</a> · ${escapeHtml(source.license)}`)
              .join(' | ')}</p>`
            : ''}

          <div class="facts-grid">
            ${sections
              .map(
                (section) => `
                  <div class="fact-box">
                    <h4>${section.title}</h4>
                    <p>${section.content}</p>
                    <p style="margin-top: 8px; color: var(--muted);">${section.value}</p>
                  </div>
                `
              )
              .join('')}
          </div>
        </article>

        <aside class="sidebar-card">
          <h3>Entry summary</h3>
          <ul class="meta-list">
            <li><strong>Species</strong><span>${safeValue(entry.species)}</span></li>
            <li><strong>Home planet</strong><span>${safeValue(entry.homePlanet)}</span></li>
            <li><strong>Habitat</strong><span>${safeValue(entry.habitat)}</span></li>
            <li><strong>Universe</strong><span>${getWorldName(entry.universeId)}</span></li>
            <li><strong>Source</strong><span>${safeValue(entry.source)}</span></li>
          </ul>

          <div style="margin-top: 18px;">
            <h3>Related entries</h3>
            <ul class="related-list">
              ${relatedEntries
                .map(
                  (related) => `
                    <li><strong>${related.name}</strong><span>${getWorldName(related.universeId)}</span></li>
                  `
                )
                .join('') || '<li><strong>No related entries</strong></li>'}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderPlanetsPage() {
  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Planet explorer</h2>
          <a href="#/universes" class="link-chip">View universes</a>
        </div>
        <div class="planet-grid card-grid">
          ${planets
            .map(
              (planet) => `
                <article class="card planet-card">
                  ${getPlanetIllustration(planet)}
                  <div class="article-card__meta"><span>${getWorldName(planet.universeId)}</span><span>${planet.type}</span></div>
                  <h3>${planet.name}</h3>
                  <p>${planet.environment}</p>
                  <ul class="meta-list">
                    <li><strong>Inhabitants</strong><span>${planet.inhabitants.join(', ')}</span></li>
                  </ul>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderComparisonTable(first, second) {
  const rows = [
    { label: 'Species', value: (entry) => entry.species || 'Not documented' },
    { label: 'Home planet', value: (entry) => entry.homePlanet || 'Not documented' },
    { label: 'Habitat', value: (entry) => entry.habitat || 'Not documented' },
    { label: 'Intelligence', value: (entry) => entry.attributes?.intelligence || 'Not documented' },
    { label: 'Communication', value: (entry) => entry.attributes?.communication || 'Not documented' },
    { label: 'Biology', value: (entry) => entry.attributes?.biology || 'Not documented' },
    { label: 'Abilities', value: (entry) => (entry.attributes?.abilities || ['Not documented']).join(', ') },
    { label: 'Limitations', value: (entry) => (entry.attributes?.limitations || ['Not documented']).join(', ') },
  ];

  return `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>${first.name}</th>
          <th>${second.name}</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
              <tr>
                <td>${row.label}</td>
                <td>${row.value(first)}</td>
                <td>${row.value(second)}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `;
}

const powerCategories = [
  { label: 'Offense', points: 20, terms: /strength|strike|weapon|beam|attack|force|vision|flame|pyro|blast|damage/i },
  { label: 'Defense', points: 20, terms: /durability|armor|healing|regeneration|resilience|immunity|defense|shield/i },
  { label: 'Mobility', points: 20, terms: /flight|speed|agility|reflex|movement|teleport|mobility/i },
  { label: 'Energy / special powers', points: 20, terms: /energy|ki|psychic|telepathy|magic|electric|force|weather|crystal|fire|flame|technology|transformation|thunder|static|shock/i },
  { label: 'Utility', points: 20, terms: /leadership|command|reconnaissance|survival|shape-shifting|terrain|data processing|healing|communication|regeneration/i },
];

function getPowerProfile(entry) {
  const abilities = Array.isArray(entry.attributes?.abilities) ? entry.attributes.abilities : [];
  const documented = abilities.length > 0;
  const categories = powerCategories.map((category) => {
    const evidence = abilities.filter((ability) => category.terms.test(ability));
    return { ...category, evidence, earned: evidence.length ? category.points : 0 };
  });

  return {
    points: categories.reduce((sum, category) => sum + category.earned, 0),
    maxPoints: powerCategories.reduce((sum, category) => sum + category.points, 0),
    categories,
    documented,
  };
}

function computeComparisonScore(first, second) {
  const comparable = [
    { label: 'Species', left: first.species, right: second.species },
    { label: 'Home planet', left: first.homePlanet, right: second.homePlanet },
    { label: 'Habitat', left: first.habitat, right: second.habitat },
    { label: 'Intelligence', left: first.attributes?.intelligence, right: second.attributes?.intelligence },
    { label: 'Communication', left: first.attributes?.communication, right: second.attributes?.communication },
    { label: 'Biology', left: first.attributes?.biology, right: second.attributes?.biology },
  ];
  const isDocumented = (value) =>
    Boolean(value && !/^(unknown|not documented|n\/a)(\s|$)/i.test(String(value).trim()));
  const comparedAttributes = comparable.filter(({ left, right }) =>
    isDocumented(left) && isDocumented(right)
  );
  const matches = comparedAttributes.filter(
    ({ left, right }) => String(left).trim().toLowerCase() === String(right).trim().toLowerCase()
  ).length;

  return {
    score: comparedAttributes.length ? Math.round((matches / comparedAttributes.length) * 100) : 0,
    total: comparedAttributes.length,
    matches,
    comparedAttributes,
    coverage: Math.round((comparedAttributes.length / comparable.length) * 100),
  };
}

function renderComparisonResults(first, second) {
  const similarity = computeComparisonScore(first, second);
  const leftPower = getPowerProfile(first);
  const rightPower = getPowerProfile(second);
  const description =
    first.id === second.id
      ? 'The same entry is selected twice, so its documented fields match.'
      : `${similarity.matches} matching attributes out of ${similarity.total} fields documented for both entries.`;

  return `
    <div class="compare-layout">
      <section class="card comparison-summary">
        <h3>Exact profile matches</h3>
        <div class="score-box">
          <div class="score-ring" style="--score-degrees: ${similarity.score * 3.6}deg" title="Exact documented field matches">${similarity.score}%</div>
          <p>${description}</p>
          <p class="muted-copy">Coverage: ${similarity.coverage}% of six profile fields have data for both entries. Unknown values are excluded. This compares exact field values; it is not a semantic or power score.</p>
        </div>
      </section>
      <section class="card comparison-summary">
        <h3>Power points <span class="tag">Xenopedia estimate</span></h3>
        <div class="power-versus">
          <div><strong>${escapeHtml(first.name)}</strong><b>${leftPower.documented ? `${leftPower.points}/${leftPower.maxPoints}` : 'Insufficient data'}</b></div>
          <div><strong>${escapeHtml(second.name)}</strong><b>${rightPower.documented ? `${rightPower.points}/${rightPower.maxPoints}` : 'Insufficient data'}</b></div>
        </div>
        <p class="muted-copy">Each point category is worth 20 points and is earned only when a listed ability supports it. This measures documented capability breadth—not a canon power level or guaranteed combat outcome.</p>
      </section>
    </div>
    <div class="card comparison-detail">
      <h3>Power profile</h3>
      <table class="compare-table">
        <thead><tr><th>Capability category</th><th>${escapeHtml(first.name)}</th><th>${escapeHtml(second.name)}</th></tr></thead>
        <tbody>
          ${powerCategories.map((category, index) => {
            const left = leftPower.categories[index];
            const right = rightPower.categories[index];
            const evidenceText = (profile, item) =>
              item.earned ? `+${item.earned} · ${item.evidence.join(', ')}` : profile.documented ? 'No listed ability matched' : 'Not documented';
            return `<tr>
              <td>${category.label} <span class="tag">${category.points} pts</span></td>
              <td>${evidenceText(leftPower, left)}</td>
              <td>${evidenceText(rightPower, right)}</td>
            </tr>`;
          }).join('')}
          <tr class="power-total"><th>Total</th><th>${leftPower.documented ? `${leftPower.points}/${leftPower.maxPoints}` : 'Insufficient data'}</th><th>${rightPower.documented ? `${rightPower.points}/${rightPower.maxPoints}` : 'Insufficient data'}</th></tr>
        </tbody>
      </table>
    </div>
    <div class="card comparison-detail">
      <h3>Record comparison</h3>
      ${renderComparisonTable(first, second)}
    </div>
  `;
}

function renderComparePage(leftId = 'heatblast', rightId = 'goku') {
  const first = getEntryById(leftId) || entries[0];
  const second = getEntryById(rightId) || entries[1];

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Alien comparison engine</h2>
          <a href="#/encyclopedia" class="link-chip">Browse archive</a>
        </div>
        <div class="card select-wrap">
          <label>
            Select alien A
            <select id="compare-left">
              ${entries.map((entry) => `<option value="${entry.id}" ${entry.id === first.id ? 'selected' : ''}>${escapeHtml(entry.name)} · ${escapeHtml(getWorldName(entry.universeId))}</option>`).join('')}
            </select>
          </label>
          <label>
            Select alien B
            <select id="compare-right">
              ${entries.map((entry) => `<option value="${entry.id}" ${entry.id === second.id ? 'selected' : ''}>${escapeHtml(entry.name)} · ${escapeHtml(getWorldName(entry.universeId))}</option>`).join('')}
            </select>
          </label>
          <button class="primary-btn" id="compare-run" type="button">Update comparison</button>
        </div>
        <div id="comparison-output" aria-live="polite">
          ${renderComparisonResults(first, second)}
        </div>
      </div>
    </section>
  `;
}

function compareSelectedEntries() {
  const leftSelect = document.getElementById('compare-left');
  const rightSelect = document.getElementById('compare-right');
  const output = document.getElementById('comparison-output');
  if (!leftSelect || !rightSelect || !output) return;

  const left = getEntryById(leftSelect.value);
  const right = getEntryById(rightSelect.value);
  if (left && right) output.innerHTML = renderComparisonResults(left, right);
}

function renderSimulatorPage() {
  const selectedEntries = [entries[0], entries[1]];
  const result = calculateSimulatorStatus(selectedEntries, {
    temperature: 62,
    atmosphere: 'oxygen-rich',
    gravity: 1,
    habitat: 'volcanic',
    hazards: 'low',
  });

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Colony compatibility simulator</h2>
          <span class="link-chip">Fictional educational tool</span>
        </div>

        <div class="simulator-grid">
          <div class="card">
            <div class="form-grid">
              <label>
                Species A
                <select id="sim-species-1">
                  ${entries.map((entry) => `<option value="${entry.id}" ${entry.id === selectedEntries[0].id ? 'selected' : ''}>${entry.name}</option>`).join('')}
                </select>
              </label>
              <label>
                Species B
                <select id="sim-species-2">
                  ${entries.map((entry) => `<option value="${entry.id}" ${entry.id === selectedEntries[1].id ? 'selected' : ''}>${entry.name}</option>`).join('')}
              </select>
              </label>
              <label>
                Temperature range (°C)
                <input id="sim-temp" type="number" value="62" />
              </label>
              <label>
                Atmospheric composition
                <select id="sim-atmosphere">
                  <option value="oxygen-rich" selected>Oxygen-rich</option>
                  <option value="nitrogen-heavy">Nitrogen-heavy</option>
                  <option value="volcanic">Volcanic</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>
              <label>
                Gravity level
                <input id="sim-gravity" type="number" value="1" step="0.1" />
              </label>
              <label>
                Habitat type
                <select id="sim-habitat">
                  <option value="volcanic" selected>Volcanic</option>
                  <option value="forest">Forest</option>
                  <option value="oceanic">Oceanic</option>
                  <option value="urban">Urban</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>
              <label>
                Hazard level
                <select id="sim-hazard">
                  <option value="low" selected>Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </label>
              <button id="sim-run" class="primary-btn" type="button">Evaluate habitat</button>
            </div>
          </div>

          <div class="card result-card">
            <div class="status-badge status-${result.statusKey}">${result.status}</div>
            <h3>${result.score}% compatibility</h3>
            <p>${result.summary}</p>
            <ul class="meta-list">
              ${result.compatible.map((item) => `<li><strong>Compatible</strong><span>${item}</span></li>`).join('')}
              ${result.conflicts.map((item) => `<li><strong>Conflict</strong><span>${item}</span></li>`).join('')}
              ${result.missing.map((item) => `<li><strong>Missing data</strong><span>${item}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

function calculateSimulatorStatus(selectedSpecies, environment) {
  const species = selectedSpecies.map((id) => getEntryById(id)).filter(Boolean);
  const conditions = species.map((entry) => {
    const data = (entry.attributes && entry.attributes.environment) || '';
    const habitat = (entry.habitat || '').toLowerCase();
    const compatibilityText = [];
    let score = 65;

    if (environment.temperature >= 60 && /volcanic|high heat|hot|molten/.test(data.toLowerCase() + ' ' + habitat)) {
      compatibilityText.push('Thermal profile aligns with a hot or volcanic habitat');
      score += 12;
    } else if (environment.temperature < 20) {
      compatibilityText.push('Cooler temperature range may not align with the species profile');
      score -= 16;
    }

    if (environment.atmosphere === 'oxygen-rich' && /oxygen|air|open/.test((data + ' ' + habitat).toLowerCase())) {
      compatibilityText.push('Atmosphere support is broadly consistent with documented needs');
      score += 8;
    }

    if (environment.habitat === 'forest' && /forest|surrounding|open/.test(habitat)) {
      compatibilityText.push('Habitat fits a terrestrial or natural biome');
      score += 10;
    }

    if (environment.hazard === 'high' && /limited|sensitive|requires/.test((entry.attributes?.limitations || []).join(' ').toLowerCase())) {
      compatibilityText.push('High hazard risk requires mitigation');
      score -= 10;
    }

    if (!data) {
      compatibilityText.push('Critical environmental data is missing');
      score -= 20;
    }

    return {
      name: entry.name,
      score: clamp(score, 0, 100),
      summary: compatibilityText.join('; ') || 'No strong environmental indicator was documented.',
    };
  });

  const average = Math.round(conditions.reduce((sum, item) => sum + item.score, 0) / conditions.length);
  let status = 'Compatible under modeled conditions';
  let statusKey = 'compatible';

  if (average >= 75) {
    status = 'Compatible under modeled conditions';
    statusKey = 'compatible';
  } else if (average >= 50) {
    status = 'Compatible with modifications';
    statusKey = 'warning';
  } else if (average >= 25) {
    status = 'Major conflicts detected';
    statusKey = 'danger';
  } else {
    status = 'Insufficient data';
    statusKey = 'muted';
  }

  return {
    status,
    statusKey,
    score: average,
    summary: `${species[0]?.name || 'Species'} and ${species[1]?.name || 'another species'} show ${average}% modeled compatibility based on environmental profile and documented biological traits.`,
    compatible: conditions.filter((entry) => entry.score >= 60).map((entry) => `${entry.name}: ${entry.summary}`),
    conflicts: conditions.filter((entry) => entry.score < 50).map((entry) => `${entry.name}: ${entry.summary}`),
    missing: species.filter((entry) => !(entry.attributes && entry.attributes.environment)).map((entry) => `${entry.name} lacks sufficiently documented environmental requirements.`),
  };
}

function renderGraphPage() {
  const selected = getEntryById(state.selectedGraphEntry) || entries[0];
  const nodeMap = new Map();

  entries.forEach((entry, index) => {
    const x = 110 + ((index % 4) * 190);
    const y = 110 + (Math.floor(index / 4) * 120);
    nodeMap.set(entry.id, { x, y });
  });

  const graphEdges = relationships
    .map((relationship) => {
      const source = nodeMap.get(relationship.source);
      const target = nodeMap.get(relationship.target);
      if (!source || !target) return null;
      return `<line class="graph-edge" x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" />`;
    })
    .filter(Boolean)
    .join('');

  const graphNodes = entries
    .map((entry) => {
      const position = nodeMap.get(entry.id);
      return `
        <g class="graph-node" data-entry-id="${entry.id}" tabindex="0">
          <circle cx="${position.x}" cy="${position.y}" r="28"></circle>
          <text x="${position.x}" y="${position.y + 4}">${entry.name.split(' ')[0]}</text>
        </g>
      `;
    })
    .join('');

  const detail = getEntryById(selected.id) || entries[0];

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Knowledge graph</h2>
          <a href="#/encyclopedia" class="link-chip">Open entry map</a>
        </div>

        <div class="graph-shell">
          <div class="graph-panel">
            <svg class="graph-svg" viewBox="0 0 900 500" aria-label="Knowledge graph">
              ${graphEdges}
              ${graphNodes}
            </svg>
          </div>
          <div class="graph-controls">
            <button class="secondary-btn" type="button" id="graph-fit">Reset view</button>
            <button class="secondary-btn" type="button" id="graph-next">Select next node</button>
            <span class="tag">${detail.name}</span>
          </div>
        </div>

        <div class="card" style="margin-top: 20px;">
          <h3>${detail.name}</h3>
          <p>${detail.summary}</p>
          <ul class="meta-list">
            <li><strong>Universe</strong><span>${getWorldName(detail.universeId)}</span></li>
            <li><strong>Species</strong><span>${detail.species}</span></li>
            <li><strong>Home planet</strong><span>${detail.homePlanet}</span></li>
            <li><strong>Abilities</strong><span>${(detail.attributes?.abilities || ['Not documented']).join(', ')}</span></li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderRankingsPage() {
  const rankingCards = [
    { title: 'Cosmic Top 10', items: rankings.cosmicTop10 },
    { title: 'Trending Aliens', items: rankings.trending.map((entry) => ({ ...entry, rank: entry.delta })) },
    { title: 'Most Compared', items: rankings.compared.map((entry) => ({ ...entry, rank: `${entry.count} comparisons` })) },
    { title: 'Most Explored Planets', items: rankings.exploredPlanets.map((entry) => ({ ...entry, rank: `${entry.visits} visits` })) },
  ];

  return `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2 class="section__title">Cosmic ranking system</h2>
          <span class="link-chip">Sample activity data</span>
        </div>

        <div class="rank-grid">
          ${rankingCards
            .map(
              (group) => `
                <article class="card rank-card">
                  <div class="rank-card__top">
                    <h3>${group.title}</h3>
                  </div>
                  <ul class="discovery-list">
                    ${group.items
                      .map(
                        (item, index) => `
                          <li>
                            <div class="rank-card__top" style="width: 100%;">
                              <span class="rank-badge">${index + 1}</span>
                              <strong>${item.name}</strong>
                              <span>${item.rank || getWorldName(item.universeId)}</span>
                            </div>
                          </li>
                        `
                      )
                      .join('')}
                  </ul>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderNotFound() {
  return `
    <section class="section">
      <div class="container">
        <div class="empty-state">
          <h2>Page not found</h2>
          <p>The requested article or route could not be resolved in the current archive.</p>
          <a href="#/" class="primary-btn">Return home</a>
        </div>
      </div>
    </section>
  `;
}

function renderCurrentRoute() {
  const route = routeFromHash();

  if (route === '/' || route === '') {
    appEl.innerHTML = renderHomePage();
    bindHomeSearch();
    return;
  }

  if (route === '/encyclopedia') {
    appEl.innerHTML = renderEncyclopediaPage();
    bindEncyclopediaFilters();
    return;
  }

  if (route === '/universes') {
    appEl.innerHTML = renderUniverseIndex();
    return;
  }

  if (route === '/planets') {
    appEl.innerHTML = renderPlanetsPage();
    return;
  }

  if (route === '/compare') {
    appEl.innerHTML = renderComparePage();
    bindCompareControls();
    return;
  }

  if (route === '/simulator') {
    appEl.innerHTML = renderSimulatorPage();
    bindSimulatorControls();
    return;
  }

  if (route === '/graph') {
    appEl.innerHTML = renderGraphPage();
    bindGraphControls();
    return;
  }

  if (route === '/rankings') {
    appEl.innerHTML = renderRankingsPage();
    return;
  }

  const universeMatch = route.match(/^\/universes\/(.+)$/);
  if (universeMatch) {
    const universeId = universeMatch[1];
    appEl.innerHTML = renderUniversePage(universeId);
    return;
  }

  const articleMatch = route.match(/^\/articles\/(.+)$/);
  if (articleMatch) {
    appEl.innerHTML = renderArticlePage(articleMatch[1]);
    return;
  }

  appEl.innerHTML = renderNotFound();
}

function bindHomeSearch() {
  const searchInput = document.getElementById('global-search');
  const suggestionBox = document.getElementById('search-suggestions');

  if (!searchInput || !suggestionBox) return;

  const filterSuggestions = () => {
    const value = searchInput.value;
    const suggestions = searchEntries(value).slice(0, 5);
    suggestionBox.innerHTML = suggestions.length
      ? suggestions
          .map(
            (entry) => `
              <button type="button" data-entry-id="${entry.id}">
                ${entry.name} · ${getWorldName(entry.universeId)}
              </button>
            `
          )
          .join('')
      : '<button type="button" disabled>No matching records</button>';
    suggestionBox.classList.toggle('visible', Boolean(value));
  };

  searchInput.addEventListener('input', filterSuggestions);

  suggestionBox.addEventListener('click', (event) => {
    const button = event.target.closest('[data-entry-id]');
    if (!button) return;
    const entryId = button.dataset.entryId;
    navigateTo(`/articles/${entryId}`);
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const value = searchInput.value.trim();
      if (!value) return;
      const match = searchEntries(value)[0];
      if (match) navigateTo(`/articles/${match.id}`);
    }
  });
}

function bindEncyclopediaFilters() {
  const searchInput = document.getElementById('encyclopedia-search');
  const universeFilter = document.getElementById('universe-filter');
  const typeFilter = document.getElementById('type-filter');
  const sortFilter = document.getElementById('sort-filter');

  if (!searchInput && !universeFilter && !typeFilter && !sortFilter) return;

  const applyFilters = () => {
    const route = routeFromHash();
    if (route !== '/encyclopedia') return;
    appEl.innerHTML = renderEncyclopediaPage();
    bindEncyclopediaFilters();
    bindNavigation();
  };

  searchInput?.addEventListener('input', applyFilters);
  universeFilter?.addEventListener('change', applyFilters);
  typeFilter?.addEventListener('change', applyFilters);
  sortFilter?.addEventListener('change', applyFilters);
}

function bindCompareControls() {
  const compareButton = document.getElementById('compare-run');
  const leftSelect = document.getElementById('compare-left');
  const rightSelect = document.getElementById('compare-right');
  compareButton?.addEventListener('click', compareSelectedEntries);
  leftSelect?.addEventListener('change', compareSelectedEntries);
  rightSelect?.addEventListener('change', compareSelectedEntries);
}

function bindSimulatorControls() {
  const runButton = document.getElementById('sim-run');
  if (!runButton) return;

  runButton.addEventListener('click', () => {
    const speciesA = document.getElementById('sim-species-1').value;
    const speciesB = document.getElementById('sim-species-2').value;
    const temp = Number(document.getElementById('sim-temp').value || 0);
    const atmosphere = document.getElementById('sim-atmosphere').value;
    const gravity = Number(document.getElementById('sim-gravity').value || 1);
    const habitat = document.getElementById('sim-habitat').value;
    const hazard = document.getElementById('sim-hazard').value;

    const result = calculateSimulatorStatus([speciesA, speciesB], {
      temperature: temp,
      atmosphere,
      gravity,
      habitat,
      hazards: hazard,
    });

    const card = document.querySelector('.result-card');
    card.innerHTML = `
      <div class="status-badge status-${result.statusKey}">${result.status}</div>
      <h3>${result.score}% compatibility</h3>
      <p>${result.summary}</p>
      <ul class="meta-list">
        ${result.compatible.map((item) => `<li><strong>Compatible</strong><span>${item}</span></li>`).join('') || '<li><strong>Compatible</strong><span>No strong compatibility signals were documented.</span></li>'}
        ${result.conflicts.map((item) => `<li><strong>Conflict</strong><span>${item}</span></li>`).join('') || '<li><strong>Conflict</strong><span>No critical conflict detected from the modeled inputs.</span></li>'}
        ${result.missing.map((item) => `<li><strong>Missing data</strong><span>${item}</span></li>`).join('') || '<li><strong>Missing data</strong><span>Core environmental variables are present.</span></li>'}
      </ul>
    `;
  });
}

function bindGraphControls() {
  const svg = document.querySelector('.graph-svg');
  if (!svg) return;

  const nodeButtons = svg.querySelectorAll('.graph-node');
  nodeButtons.forEach((node) => {
    node.addEventListener('click', () => {
      const entryId = node.dataset.entryId;
      state.selectedGraphEntry = entryId;
      renderCurrentRoute();
    });
  });

  const resetButton = document.getElementById('graph-fit');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      svg.style.transform = 'scale(1)';
    });
  }

  const nextButton = document.getElementById('graph-next');
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const currentIndex = entries.findIndex((entry) => entry.id === state.selectedGraphEntry);
      const nextIndex = (currentIndex + 1) % entries.length;
      state.selectedGraphEntry = entries[nextIndex].id;
      renderCurrentRoute();
    });
  }
}

function bindNavigation() {
  const navLinks = document.querySelectorAll('[data-route]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#/')) return;
      event.preventDefault();
      navigateTo(href.replace(/^#/, ''));
    });
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('visible');
      toggle.setAttribute('aria-expanded', String(nav.classList.contains('visible')));
    });
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function handleRouteChange() {
  renderCurrentRoute();
  bindNavigation();
}

window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('DOMContentLoaded', () => {
  handleRouteChange();
});
