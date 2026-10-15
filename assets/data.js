window.XenopediaData = (() => {
  const universes = [
    {
      id: 'ben-10',
      name: 'Ben 10',
      tagline: 'Omnitrix-powered interstellar anomaly tracker',
      description:
        'A universe of alien heroes, power transformations, and cosmic threats shaped by the Omnitrix and interplanetary travel.',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=85',
      featured: ['heatblast', 'four-arms', 'xlr8', 'diamondhead'],
    },
    {
      id: 'dragon-ball',
      name: 'Dragon Ball',
      tagline: 'Saiyan legends, Ki, and cosmic power scaling',
      description:
        'An energetic multiverse of dragon gods, celestial deities, and rival warriors whose power levels are often described through Ki-based feats.',
      image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1200&q=85',
      featured: ['goku', 'vegeta', 'piccolo', 'frieza'],
    },
    {
      id: 'star-wars',
      name: 'Star Wars',
      tagline: 'Galactic civilizations and Force-sensitive life',
      description:
        'A galaxy rich with species, hyperspace travel, and a deep network of political and spiritual conflict.',
      image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1200&q=85',
      featured: ['yoda', 'chewbacca', 'darth-vader'],
    },
    {
      id: 'marvel',
      name: 'Marvel',
      tagline: 'Superhuman anomalies and cosmic guardians',
      description:
        'Earthbound heroes and intergalactic beings whose abilities often intersect with advanced technology and mystical forces.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
      featured: ['wolverine', 'doctor-strange', 'groot'],
    },
    {
      id: 'dc',
      name: 'DC',
      tagline: 'Metahumans, Kryptonian endurance, and cosmic justice',
      description:
        'A universe of powerful beings, alien visitors, and highly advanced worlds shaped by mythic conflict.',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=85',
      featured: ['superman', 'martian-manhunter', 'cyborg'],
    },
    {
      id: 'transformers',
      name: 'Transformers',
      tagline: 'Sentient machines on a fractured cosmic frontier',
      description:
        'Autobot and Decepticon civilizations whose forms shift between organic and mechanical characteristics.',
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=85',
      featured: ['optimus-prime', 'bumblebee', 'megatron'],
    },
    {
      id: 'pokemon',
      name: 'Pokémon',
      tagline: 'Creature ecology and battle-driven evolution',
      description:
        'A richly biodiverse world where creature species, habitats, and trainer culture shape the planet at large.',
      image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=85',
      featured: ['pikachu', 'mewtwo', 'lugia', 'charizard'],
    },
  ];

  const planets = [
    { id: 'pyros', name: 'Pyros', universeId: 'ben-10', type: 'Volcanic world', environment: 'Molten lava fields, thermal vents, intense heat', inhabitants: ['Heatblast', 'Fire-based species'] },
    { id: 'namek', name: 'Namek', universeId: 'dragon-ball', type: 'Planetary habitat', environment: 'Lush terrain, fighter culture, abundant ki-reactive bioforms', inhabitants: ['Piccolo', 'Namekians'] },
    { id: 'krypton', name: 'Krypton', universeId: 'dc', type: 'Dying world', environment: 'High gravity, advanced engineering, atmospheric instability', inhabitants: ['Superman', 'Kryptonians'] },
    { id: 'cybertron', name: 'Cybertron', universeId: 'transformers', type: 'Mechanical world', environment: 'Metallic ecosystems, energy grids, tectonic stress', inhabitants: ['Optimus Prime', 'Autobots'] },
    { id: 'alola', name: 'Alola', universeId: 'pokemon', type: 'Island region', environment: 'Tropical climate, diverse biomes, coastal habitats', inhabitants: ['Pikachu', 'Regional Pokémon'] },
    { id: 'endor', name: 'Endor', universeId: 'star-wars', type: 'Forest moon', environment: 'Dense forest canopy, rich biodiversity, sheltered climate', inhabitants: ['Ewoks'] },
    { id: 'hoth', name: 'Hoth', universeId: 'star-wars', type: 'Frozen world', environment: 'Sub-zero temperatures, frozen terrain, hostile winds', inhabitants: ['Humans', 'Wampas'] },
  ];

  const civilizations = [
    { id: 'galactic-republic', name: 'Galactic Republic', universeId: 'star-wars', summary: 'A democratic alliance spanning many worlds and species.' },
    { id: 'sayian-clan', name: 'Saiyan Clan', universeId: 'dragon-ball', summary: 'A warrior lineage built on combat-focused biology and raw power.' },
    { id: 'guardian-order', name: 'Guardian Order', universeId: 'ben-10', summary: 'A response force that protects the Earth from cosmic threats.' },
    { id: 'autobot-fleet', name: 'Autobot Fleet', universeId: 'transformers', summary: 'A faction of transforming robots devoted to protection and order.' },
  ];

  const entries = [
    { id: 'heatblast', name: 'Heatblast', universeId: 'ben-10', type: 'alien', species: 'Pyronite', homePlanet: 'Pyros', habitat: 'Hot volcanic zones', summary: 'A fire-born alien whose body is formed from magma-like plasma energy.', description: 'Heatblast is a Pyronite and one of Ben Tennyson’s signature transformations. His form is powered by intense heat, flame control, and highly reactive body chemistry.', attributes: { species: 'Pyronite', intelligence: 'High for a creature-kinetic species', communication: 'Limited vocal expression, strong visual and thermal signaling', environment: 'High heat, volcanic geology', biology: 'Plasma-based physiology', abilities: ['Pyrokinesis', 'Heat immunity', 'Flight'], limitations: ['Vulnerable to cold-based suppression', 'Requires environmental heat to stabilize'] }, source: 'Ben 10 canon and fan research reference', viewCount: 1280, comparisonCount: 96, addedAt: '2024-03-16' },
    { id: 'four-arms', name: 'Four Arms', universeId: 'ben-10', type: 'alien', species: 'Tetramand', homePlanet: 'Khoros', habitat: 'Dense planetary terrain', summary: 'A towering four-limbed alien with remarkable strength and direct combat efficiency.', description: 'A Tetramand transformation with four powerful arms and dense musculature. Four Arms is often chosen for high-impact strength-based tasks.', attributes: { species: 'Tetramand', intelligence: 'Moderate', communication: 'Direct, physical, and loud', environment: 'High-gravity or rugged terrain', biology: 'Muscle-dense humanoid', abilities: ['Super strength', 'Enhanced durability', 'Powerful strikes'], limitations: ['Less agile in tight spaces', 'Heavy body mass'] }, source: 'Ben 10 canon', viewCount: 1125, comparisonCount: 83, addedAt: '2024-04-02' },
    { id: 'xlr8', name: 'XLR8', universeId: 'ben-10', type: 'alien', species: 'Kineceleran', homePlanet: 'Velgos', habitat: 'Fast-moving, open terrain', summary: 'A speed-focused alien built for rapid movement, high acceleration, and reaction time.', description: 'XLR8 is a Kineceleran with a body optimized for speed. The form is known for its exceptional agility and rapid cognition under pressure.', attributes: { species: 'Kineceleran', intelligence: 'High', communication: 'Fast gestural and vocal communication', environment: 'Open terrain, fast-motion environments', biology: 'Hyper-accelerated physiology', abilities: ['Speed burst', 'Agility', 'Reflex enhancement'], limitations: ['Limited endurance in sustained heavy contact', 'Dependent on mobility'] }, source: 'Ben 10 canon', viewCount: 1020, comparisonCount: 77, addedAt: '2024-02-18' },
    { id: 'diamondhead', name: 'Diamondhead', universeId: 'ben-10', type: 'alien', species: 'Petrosapien', homePlanet: 'Vulpin', habitat: 'Rocky and mineral-rich environments', summary: 'A crystalline alien with resilient armor and mineral shaping abilities.', description: 'Diamondhead is a Petrosapien who can form crystalline structures and use diamond-like body armor. He is especially suited to defense and extreme terrain.', attributes: { species: 'Petrosapien', intelligence: 'Moderate to high', communication: 'Strong vibration-based signals', environment: 'Rocky environments, mineral-rich terrain', biology: 'Crystal composite body', abilities: ['Crystal generation', 'Dense armor', 'Terrain shaping'], limitations: ['Slower movement', 'Sensitive to intense heat'] }, source: 'Ben 10 canon', viewCount: 990, comparisonCount: 72, addedAt: '2024-03-05' },
    { id: 'goku', name: 'Goku', universeId: 'dragon-ball', type: 'character', species: 'Saiyan', homePlanet: 'Planet Vegeta', habitat: 'Battlefields, training grounds, open terrain', summary: 'A Saiyan warrior whose power growth is keyed to training, transformation, and Ki control.', description: 'Goku is a Saiyan martial artist renowned for his relentless combat development and ability to transform through intense training and emotional states.', attributes: { species: 'Saiyan', intelligence: 'High tactical awareness', communication: 'Complex language and battle telegraphing', environment: 'Variable, training-heavy environments', biology: 'Ki-reactive humanoid physiology', abilities: ['Ki blasts', 'Flight', 'Transformation'], limitations: ['Power output depends on training state', 'Vast energy demands'] }, source: 'Dragon Ball canon', viewCount: 1720, comparisonCount: 144, addedAt: '2024-01-12' },
    { id: 'vegeta', name: 'Vegeta', universeId: 'dragon-ball', type: 'character', species: 'Saiyan', homePlanet: 'Planet Vegeta', habitat: 'Combat arenas, planetary defense zones', summary: 'A proud Saiyan prince whose power profile emphasizes precision, endurance, and tactical control.', description: 'Vegeta is a Saiyan warrior with a hyper-competitive streak and a reputation for intense discipline and strategic power use.', attributes: { species: 'Saiyan', intelligence: 'High strategic thinking', communication: 'Formal martial language', environment: 'Battlefields and controlled zones', biology: 'Ki-reactive physiology', abilities: ['Ki control', 'Elite combat reflexes', 'Transformation'], limitations: ['Overconfidence may cloud tactical decisions', 'High energy expenditure'] }, source: 'Dragon Ball canon', viewCount: 1550, comparisonCount: 133, addedAt: '2024-01-09' },
    { id: 'piccolo', name: 'Piccolo', universeId: 'dragon-ball', type: 'character', species: 'Namekian', homePlanet: 'Namek', habitat: 'Remote valleys, sacred shrines, planetary sanctuaries', summary: 'A Namekian strategist whose training, regeneration, and intellect make him a key defensive and tactical resource.', description: 'Piccolo is a Namekian warrior famed for tactical intelligence, regenerative biology, and his role as a guardian and teacher.', attributes: { species: 'Namekian', intelligence: 'High', communication: 'Sophisticated speech and telepathic communication', environment: 'Natural planetary sanctuaries', biology: 'Regenerative, green-skinned physiology', abilities: ['Energy blasts', 'Regeneration', 'Telepathy'], limitations: ['Combat skill may be outmatched by certain transformations', 'Requires recovery after intense damage'] }, source: 'Dragon Ball canon', viewCount: 1410, comparisonCount: 118, addedAt: '2024-02-01' },
    { id: 'frieza', name: 'Frieza', universeId: 'dragon-ball', type: 'character', species: 'Frieza race', homePlanet: 'Planet Frieza 79', habitat: 'Cold, imperial command centers', summary: 'A galactic tyrant whose transformation chain is associated with overwhelming power and strategic cruelty.', description: 'Frieza is a member of the Frieza race, best known for his immense power, monstrous transformations, and diplomatic terror tactics.', attributes: { species: 'Frieza race', intelligence: 'High strategic intelligence', communication: 'Formal, dominating speech', environment: 'Controlled command environments', biology: 'Transformation-based physiology', abilities: ['Energy beams', 'Transformation', 'Tactical pressure'], limitations: ['Can be outmaneuvered by more adaptive foes'] }, source: 'Dragon Ball canon', viewCount: 1384, comparisonCount: 119, addedAt: '2024-02-03' },
    { id: 'yoda', name: 'Yoda', universeId: 'star-wars', type: 'character', species: 'Unknown species', homePlanet: 'Dagobah', habitat: 'Swampy, isolated forests', summary: 'A profoundly wise Force-sensitive being whose life is tied to balance, meditation, and training.', description: 'Yoda is one of the most revered Jedi Masters in the Star Wars galaxy. He is known for his wisdom, mastery of the Force, and unusually compact physiology.', attributes: { species: 'Unknown species', intelligence: 'Extremely high', communication: 'Complex syntax and telepathic perception', environment: 'Remote forests and secluded sites', biology: 'Force-sensitive humanoid', abilities: ['Force healing', 'Telekinesis', 'Precognition'], limitations: ['Limited documented physical strength relative to some species'] }, source: 'Star Wars canon', viewCount: 1460, comparisonCount: 87, addedAt: '2024-01-19' },
    { id: 'chewbacca', name: 'Chewbacca', universeId: 'star-wars', type: 'character', species: 'Wookiee', homePlanet: 'Kashyyyk', habitat: 'Forests, high perches, large-scale ecosystems', summary: 'A towering Wookiee warrior with exceptional strength and loyalty.', description: 'Chewbacca is a Wookiee known for his physical strength, deep bond with allies, and role as a trusted pilot and engineer.', attributes: { species: 'Wookiee', intelligence: 'Moderate to high', communication: 'Wookiee language, expressive physical cues', environment: 'Forested worlds and large habitats', biology: 'Large-bodied, furred humanoid', abilities: ['Strength', 'Agility', 'Survival skills'], limitations: ['Limited documented knowledge of spaceflight technology'] }, source: 'Star Wars canon', viewCount: 1232, comparisonCount: 81, addedAt: '2024-05-11' },
    { id: 'darth-vader', name: 'Darth Vader', universeId: 'star-wars', type: 'character', species: 'Human', homePlanet: 'Tatooine', habitat: 'Command decks, imperial stations', summary: 'A cyborg Sith Lord associated with imposing armor, brutal discipline, and immense dark-side power.', description: 'Darth Vader is a human cyborg and Sith Lord, recognized for his devastating Force abilities and tactical command of the Galactic Empire.', attributes: { species: 'Human', intelligence: 'High strategic awareness', communication: 'Formal and menacing', environment: 'Command operations and battle stations', biology: 'Cybernetic augmentation', abilities: ['Force power', 'Strength augmentation', 'Tactical command'], limitations: ['High dependence on mechanical support'] }, source: 'Star Wars canon', viewCount: 1201, comparisonCount: 74, addedAt: '2024-05-01' },
    { id: 'superman', name: 'Superman', universeId: 'dc', type: 'character', species: 'Kryptonian', homePlanet: 'Krypton', habitat: 'Sustained human civilization and open planets', summary: 'A Kryptonian hero whose abilities are shaped by solar exposure and a deep humanitarian mission.', description: 'Superman is a Kryptonian raised on Earth, distinguished by his immense strength, flight, and resilient physiology.', attributes: { species: 'Kryptonian', intelligence: 'High', communication: 'Human and alien forms, diplomatic and direct', environment: 'Solar-rich environments', biology: 'Solar-powered humanoid', abilities: ['Flight', 'Super strength', 'Heat vision'], limitations: ['Weakness to kryptonite', 'Requires careful energy balance'] }, source: 'DC canon', viewCount: 1640, comparisonCount: 138, addedAt: '2024-01-15' },
    { id: 'martian-manhunter', name: 'Martian Manhunter', universeId: 'dc', type: 'character', species: 'Martian', homePlanet: 'Mars', habitat: 'Urban and remote planetary environments', summary: 'A telepathic Martian detective whose abilities include shape-shifting and empathic perception.', description: 'Martian Manhunter is a Martian hero known for shape-shifting, psychic powers, and a deep connection to alien heritage and justice.', attributes: { species: 'Martian', intelligence: 'Very high', communication: 'Telepathic and social', environment: 'Variable, adaptable to planetary life', biology: 'Shape-shifting physiology', abilities: ['Shape-shifting', 'Telepathy', 'Flight'], limitations: ['Limited documented elemental weaknesses'] }, source: 'DC canon', viewCount: 1178, comparisonCount: 63, addedAt: '2024-03-17' },
    { id: 'cyborg', name: 'Cyborg', universeId: 'dc', type: 'character', species: 'Cybernetic human', homePlanet: 'Earth', habitat: 'Urban and tactical environments', summary: 'A cyborg hero whose abilities emphasize hybrid machine-human systems and tactical interface usage.', description: 'Cyborg is a human-machine hybrid with integrated systems for combat support, communications, and field intelligence.', attributes: { species: 'Cybernetic human', intelligence: 'High technical intelligence', communication: 'Interface-driven', environment: 'Urban and field operations', biology: 'Machine-human hybrid', abilities: ['Cybernetics', 'Data processing', 'Enhanced strength'], limitations: ['Sensitive to targeted electrical disruption'] }, source: 'DC canon', viewCount: 1098, comparisonCount: 58, addedAt: '2024-04-11' },
    { id: 'optimus-prime', name: 'Optimus Prime', universeId: 'transformers', type: 'character', species: 'Cybertronian', homePlanet: 'Cybertron', habitat: 'Industrial and battlefront zones', summary: 'A leader from the planet Cybertron whose role is defined by protection, strategic command, and transformation.', description: 'Optimus Prime is a legendary Autobot leader whose body combines superior tactician skill with large-scale combat efficiency.', attributes: { species: 'Cybertronian', intelligence: 'Very high', communication: 'Advanced machine language and field command', environment: 'High-energy industrial settings', biology: 'Machine-based lifeform', abilities: ['Transformation', 'Leadership', 'Weapon systems'], limitations: ['Sensitive to severe resource depletion'] }, source: 'Transformers canon', viewCount: 1208, comparisonCount: 66, addedAt: '2024-05-03' },
    { id: 'bumblebee', name: 'Bumblebee', universeId: 'transformers', type: 'character', species: 'Cybertronian', homePlanet: 'Cybertron', habitat: 'Field operations and defense missions', summary: 'A nimble Autobot scout with strong mobility and a brave, adaptable tactical profile.', description: 'Bumblebee is a small but highly effective Autobot scout recognized for speed, decoy tactics, and resilient combat performance.', attributes: { species: 'Cybertronian', intelligence: 'Moderate to high', communication: 'Adaptive sensor-based systems', environment: 'Flexible, mobile combat zones', biology: 'Autonomous mechanical', abilities: ['Transformation', 'Rapid movement', 'Reconnaissance'], limitations: ['Lower mass and structural endurance than larger units'] }, source: 'Transformers canon', viewCount: 1060, comparisonCount: 62, addedAt: '2024-02-09' },
    { id: 'megatron', name: 'Megatron', universeId: 'transformers', type: 'character', species: 'Cybertronian', homePlanet: 'Cybertron', habitat: 'Resource-heavy industrial battlefields', summary: 'A powerful Decepticon leader whose profile emphasizes aggression, tactical pressure, and strategic brutality.', description: 'Megatron is a formidable Cybertronian leader known for imposing military strategy and a powerful battle form.', attributes: { species: 'Cybertronian', intelligence: 'High', communication: 'Command-driven', environment: 'Industrial combat theaters', biology: 'Mechanical warrior', abilities: ['Transformation', 'Heavy weaponry', 'Command'], limitations: ['Depends on strategic suppression and force projection'] }, source: 'Transformers canon', viewCount: 1008, comparisonCount: 55, addedAt: '2024-05-17' },
    { id: 'pikachu', name: 'Pikachu', universeId: 'pokemon', type: 'creature', species: 'Pikachu', homePlanet: 'Alola', habitat: 'Forest edges and meadow areas', summary: 'A lightning-based electric creature known for agility, portability, and social familiarity.', description: 'Pikachu is a widely recognized electric Pokémon with an active social profile and strong ecological adaptability to varied terrain.', attributes: { species: 'Pikachu', intelligence: 'Moderate', communication: 'Vocal and body-language signaling', environment: 'Temperate forest edges and open fields', biology: 'Electric rodent physiology', abilities: ['Thunder Shock', 'Quick Attack', 'Static'], limitations: ['High sensitivity to environmental electrical stress'] }, source: 'Pokémon dataset', viewCount: 1901, comparisonCount: 170, addedAt: '2024-01-07' },
    { id: 'mewtwo', name: 'Mewtwo', universeId: 'pokemon', type: 'creature', species: 'Mewtwo', homePlanet: 'Unknown', habitat: 'Research labs and high-altitude zones', summary: 'A genetically enhanced Pokémon recognized for exceptional intelligence, power, and unusual origin.', description: 'Mewtwo is a powerful Pokémon bred through advanced genetic experimentation and is often associated with high cognitive ability and intense combat output.', attributes: { species: 'Mewtwo', intelligence: 'Very high', communication: 'Advanced telepathic and direct signaling', environment: 'Controlled, high-tech environments', biology: 'Genetically derived pseudo-organic physiology', abilities: ['Psychic power', 'Energy bursts', 'Resilience'], limitations: ['Dependent on controlled environments when unstable'] }, source: 'Pokémon dataset', viewCount: 1760, comparisonCount: 150, addedAt: '2024-01-05' },
    { id: 'charizard', name: 'Charizard', universeId: 'pokemon', type: 'creature', species: 'Charizard', homePlanet: 'Kanto', habitat: 'Volcanic cliffs and high-altitude ridges', summary: 'A flame-backed dragon Pokémon whose needs and ecology suggest adaptation to warm, elevated terrain.', description: 'Charizard is a fire-and-flying species with a strong association with volcanic geology, aggressive mobility, and open-air combat.', attributes: { species: 'Charizard', intelligence: 'Moderate to high', communication: 'Roaring vocal pattern and environmental signaling', environment: 'Volcanic and mountainous climates', biology: 'Fire-breathing draconic physiology', abilities: ['Flame attack', 'Flight', 'Terrain dominance'], limitations: ['Less effective in cold, dense habitats'] }, source: 'Pokémon dataset', viewCount: 1705, comparisonCount: 145, addedAt: '2024-02-11' },
    { id: 'lugia', name: 'Lugia', universeId: 'pokemon', type: 'creature', species: 'Lugia', homePlanet: 'Unknown marine zone', habitat: 'Oceanic storm currents and deep-sea perches', summary: 'A massive flying creature tied to severe weather and oceanic mystery.', description: 'Lugia is a legendary Pokémon known for its maritime residence and a highly exceptional combination of psychic and aerial abilities.', attributes: { species: 'Lugia', intelligence: 'High', communication: 'Psychic and atmospheric signaling', environment: 'Stormy oceanic zones', biology: 'Aerial marine-adapted', abilities: ['Psychic force', 'Aerial lift', 'Weather correlation'], limitations: ['Complex habitat dependence'] }, source: 'Pokémon dataset', viewCount: 1320, comparisonCount: 94, addedAt: '2024-03-08' },
    { id: 'wolverine', name: 'Wolverine', universeId: 'marvel', type: 'character', species: 'Mutant', homePlanet: 'Earth', habitat: 'Combat zones, wilderness, military operations', summary: 'A mutant with a highly durable physiology, rapid healing, and intense combat instincts.', description: 'Wolverine is widely recognized for his regenerative ability, razor-sharp claws, and relentless tactical resilience.', attributes: { species: 'Mutant', intelligence: 'High combat awareness', communication: 'Direct, blunt, tactical', environment: 'Harsh field conditions', biology: 'Regenerative mutation', abilities: ['Healing factor', 'Claw strikes', 'Enhanced senses'], limitations: ['Psychological volatility'] }, source: 'Marvel canon', viewCount: 1120, comparisonCount: 59, addedAt: '2024-05-12' },
    { id: 'doctor-strange', name: 'Doctor Strange', universeId: 'marvel', type: 'character', species: 'Human', homePlanet: 'Earth', habitat: 'Arcane sanctums and cosmic thresholds', summary: 'A magical practitioner whose scientific and mystical expertise bridges worlds and dimensions.', description: 'Doctor Strange is a master of mystical arts, dimensional travel, and high-level reality manipulation through arcane ritual and focus.', attributes: { species: 'Human', intelligence: 'Very high', communication: 'Academic, mystical, strategic', environment: 'Ritual spaces and mystical dimensions', biology: 'Human with arcane training', abilities: ['Magic', 'Dimensional travel', 'Reality shaping'], limitations: ['Requires focus, preparation, and risk management'] }, source: 'Marvel canon', viewCount: 1285, comparisonCount: 70, addedAt: '2024-06-02' },
    { id: 'groot', name: 'Groot', universeId: 'marvel', type: 'character', species: 'Flora colossus', homePlanet: 'Planet X', habitat: 'Forested and natural environments', summary: 'A colossal flora-based being with regenerative growth and a commanding physical profile.', description: 'Groot is a towering flora being from the Marvel universe whose body expresses powerful biological growth and immense resilience.', attributes: { species: 'Flora colossus', intelligence: 'Moderate', communication: 'Limited vocabulary, expressive growth', environment: 'Forest and large botanical zones', biology: 'Plant-like exoskeletal structure', abilities: ['Rapid growth', 'Regeneration', 'Strength'], limitations: ['Language expression constraints'] }, source: 'Marvel canon', viewCount: 1002, comparisonCount: 54, addedAt: '2024-04-08' },
  ];

  const normalizeEntryName = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  (window.XenopediaImportedEntries || []).forEach((imported) => {
    const existing = entries.find(
      (entry) =>
        entry.universeId === imported.universeId &&
        normalizeEntryName(entry.name) === normalizeEntryName(imported.name)
    );
    if (!existing) {
      entries.push(imported);
      return;
    }

    const importedAttributes = Object.fromEntries(
      Object.entries(imported.attributes || {}).filter(([, value]) =>
        value != null &&
        (Array.isArray(value)
          ? value.length > 0
          : typeof value === 'object'
            ? Object.keys(value).length > 0
            : value !== '')
      )
    );
    const sourceKeys = new Set(
      (existing.sources || []).map((source) => `${source.datasetUrl}|${source.recordId}`)
    );
    Object.assign(existing, {
      image: imported.image || existing.image,
      source: imported.source || existing.source,
      sources: [
        ...(existing.sources || []),
        ...(imported.sources || []).filter(
          (source) => !sourceKeys.has(`${source.datasetUrl}|${source.recordId}`)
        ),
      ],
      importedFromDataset: imported.importedFromDataset,
      attributes: { ...(existing.attributes || {}), ...importedAttributes },
    });
  });

  const relationships = [
    { source: 'heatblast', target: 'pyros', type: 'originates-from' },
    { source: 'heatblast', target: 'pyronite', type: 'belongs-to-species' },
    { source: 'heatblast', target: 'guardian-order', type: 'associated-with-civilization' },
    { source: 'goku', target: 'sayian-clan', type: 'associated-with-civilization' },
    { source: 'goku', target: 'Planet Vegeta', type: 'originates-from' },
    { source: 'piccolo', target: 'namek', type: 'originates-from' },
    { source: 'yoda', target: 'dagobah', type: 'originates-from' },
    { source: 'chewbacca', target: 'kashyyyk', type: 'originates-from' },
    { source: 'superman', target: 'krypton', type: 'originates-from' },
    { source: 'optimus-prime', target: 'cybertron', type: 'originates-from' },
    { source: 'pikachu', target: 'alola', type: 'originates-from' },
    { source: 'mewtwo', target: 'Unknown', type: 'originates-from' },
    { source: 'goku', target: 'vegeta', type: 'related-to' },
    { source: 'superman', target: 'martian-manhunter', type: 'related-to' },
    { source: 'heatblast', target: 'diamondhead', type: 'related-to' },
  ];

  const rankings = {
    cosmicTop10: [
      { rank: 1, name: 'Goku', universeId: 'dragon-ball' },
      { rank: 2, name: 'Superman', universeId: 'dc' },
      { rank: 3, name: 'Heatblast', universeId: 'ben-10' },
      { rank: 4, name: 'Pikachu', universeId: 'pokemon' },
      { rank: 5, name: 'Yoda', universeId: 'star-wars' },
      { rank: 6, name: 'Optimus Prime', universeId: 'transformers' },
      { rank: 7, name: 'Mewtwo', universeId: 'pokemon' },
      { rank: 8, name: 'Piccolo', universeId: 'dragon-ball' },
      { rank: 9, name: 'Wolverine', universeId: 'marvel' },
      { rank: 10, name: 'Chewbacca', universeId: 'star-wars' },
    ],
    trending: [
      { name: 'Heatblast', universeId: 'ben-10', delta: '+42%' },
      { name: 'Mewtwo', universeId: 'pokemon', delta: '+38%' },
      { name: 'Yoda', universeId: 'star-wars', delta: '+31%' },
      { name: 'Optimus Prime', universeId: 'transformers', delta: '+27%' },
    ],
    compared: [
      { name: 'Pikachu', universeId: 'pokemon', count: 170 },
      { name: 'Goku', universeId: 'dragon-ball', count: 144 },
      { name: 'Superman', universeId: 'dc', count: 138 },
      { name: 'Vegeta', universeId: 'dragon-ball', count: 133 },
    ],
    exploredPlanets: [
      { name: 'Pyros', universeId: 'ben-10', visits: 103 },
      { name: 'Cybertron', universeId: 'transformers', visits: 94 },
      { name: 'Krypton', universeId: 'dc', visits: 90 },
      { name: 'Namek', universeId: 'dragon-ball', visits: 87 },
    ],
  };

  return {
    universes,
    planets,
    civilizations,
    entries,
    relationships,
    rankings,
  };
})();
