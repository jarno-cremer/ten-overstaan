// Tekent een portret als SVG uit een paar kenmerken (zie PORTRAITS in data.js).
export function portraitSVG(p, { photo = false } = {}) {
  const bg = photo ? '#e9e4d8' : '#d9cdb4';
  const ink = '#2a2420';
  const old = p.age === 'oud';
  const young = p.age === 'jong';
  const headRx = p.sex === 'v' ? 17 : 18;
  const parts = [];
  parts.push(`<rect width="100" height="120" fill="${bg}"/>`);
  // haar achter het hoofd
  if (p.hair === 'lang') parts.push(`<path d="M30 52 Q28 20 50 18 Q72 20 70 52 L74 92 L26 92 Z" fill="${p.hc}"/>`);
  if (p.hair === 'knot') parts.push(`<circle cx="50" cy="20" r="9" fill="${p.hc}"/>`);
  // schouders en jas
  parts.push(`<path d="M10 120 Q12 88 36 82 L64 82 Q88 88 90 120 Z" fill="${p.coat}"/>`);
  parts.push(`<path d="M42 82 L50 96 L58 82 Z" fill="#f3efe6"/>`);
  if (p.tie) parts.push(`<path d="M48 86 L52 86 L54 104 L50 110 L46 104 Z" fill="${p.tie}"/>`);
  // nek en hoofd
  parts.push(`<rect x="43" y="66" width="14" height="18" fill="${p.skin}"/>`);
  parts.push(`<ellipse cx="50" cy="48" rx="${headRx}" ry="22" fill="${p.skin}" stroke="${ink}" stroke-width="0.6"/>`);
  parts.push(`<ellipse cx="${50 - headRx}" cy="50" rx="3" ry="5" fill="${p.skin}"/><ellipse cx="${50 + headRx}" cy="50" rx="3" ry="5" fill="${p.skin}"/>`);
  // haar voor
  switch (p.hair) {
    case 'kort': parts.push(`<path d="M32 44 Q32 24 50 24 Q68 24 68 44 Q64 32 50 32 Q38 32 32 44 Z" fill="${p.hc}"/>`); break;
    case 'krul': for (const [x, y] of [[36, 34], [43, 28], [50, 26], [57, 28], [64, 34], [33, 42], [67, 42]]) parts.push(`<circle cx="${x}" cy="${y}" r="6" fill="${p.hc}"/>`); break;
    case 'lang': parts.push(`<path d="M32 46 Q34 24 50 25 Q66 24 68 46 Q60 32 46 34 Q38 36 32 46 Z" fill="${p.hc}"/>`); break;
    case 'knot': parts.push(`<path d="M33 42 Q34 26 50 26 Q66 26 67 42 Q60 32 50 32 Q40 32 33 42 Z" fill="${p.hc}"/>`); break;
    case 'kaal': parts.push(`<path d="M32 50 Q31 40 35 38 L35 50 Z M68 50 Q69 40 65 38 L65 50 Z" fill="${p.hc}"/>`); break;
    case 'pet': parts.push(`<path d="M31 40 Q32 22 50 22 Q68 22 69 40 Z" fill="${p.hc}"/><path d="M31 40 L78 40 Q78 44 68 44 L31 44 Z" fill="${p.hc}" stroke="${ink}" stroke-width="0.5"/>`); break;
  }
  // ogen, brillen
  if (p.shades) {
    parts.push(`<rect x="36" y="44" width="12" height="7" rx="2" fill="${ink}"/><rect x="52" y="44" width="12" height="7" rx="2" fill="${ink}"/><line x1="48" y1="46" x2="52" y2="46" stroke="${ink}" stroke-width="1.2"/>`);
  } else {
    parts.push(`<circle cx="42" cy="47" r="1.6" fill="${ink}"/><circle cx="58" cy="47" r="1.6" fill="${ink}"/>`);
    parts.push(`<path d="M38 42 Q42 40 46 42 M54 42 Q58 40 62 42" stroke="${p.hair === 'kaal' ? '#999' : p.hc}" stroke-width="1.3" fill="none"/>`);
    if (p.glasses) parts.push(`<circle cx="42" cy="47" r="5" fill="none" stroke="${ink}" stroke-width="0.9"/><circle cx="58" cy="47" r="5" fill="none" stroke="${ink}" stroke-width="0.9"/><line x1="47" y1="47" x2="53" y2="47" stroke="${ink}" stroke-width="0.9"/>`);
  }
  // neus, mond
  parts.push(`<path d="M50 49 Q48 56 51 57" stroke="${ink}" stroke-width="0.8" fill="none"/>`);
  if (p.beard === 'baard') parts.push(`<path d="M33 52 Q34 72 50 72 Q66 72 67 52 Q62 64 50 64 Q38 64 33 52 Z" fill="${p.hc}"/>`);
  if (p.beard === 'stoppel') parts.push(`<path d="M35 55 Q37 70 50 70 Q63 70 65 55 Q60 66 50 66 Q40 66 35 55 Z" fill="${ink}" opacity="0.18"/>`);
  if (p.beard === 'snor' || p.beard === 'baard') parts.push(`<path d="M42 60 Q50 56 58 60 Q50 62 42 60 Z" fill="${p.hair === 'kaal' ? '#888' : p.hc}"/>`);
  parts.push(`<path d="M44 63 Q50 ${p.sex === 'v' ? 66 : 65} 56 63" stroke="${p.sex === 'v' ? '#9a4a46' : ink}" stroke-width="1" fill="none"/>`);
  if (old) parts.push(`<path d="M36 54 Q38 56 40 55 M60 55 Q62 56 64 54 M44 36 Q50 34 56 36" stroke="${ink}" stroke-width="0.5" fill="none" opacity="0.6"/>`);
  if (young && p.sex === 'v') parts.push(`<circle cx="39" cy="56" r="2.5" fill="#d98b7e" opacity="0.35"/><circle cx="61" cy="56" r="2.5" fill="#d98b7e" opacity="0.35"/>`);
  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" class="portrait${photo ? ' photo' : ''}" aria-hidden="true">${parts.join('')}</svg>`;
}
