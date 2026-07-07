export const POS_OPTIONS = ['n', 'v', 'adj', 'adv', 'n phr', 'v phr', 'phr', 'idiom', 'other'];

export const POS_COLOR = {
  n: '#E8C468',
  'n phr': '#E8C468',
  v: '#E38B7C',
  'v phr': '#E38B7C',
  adj: '#7FA8C9',
  adv: '#B79FCB',
  phr: '#8FC0A9',
  idiom: '#8FC0A9',
  other: '#C9C2AE',
};

export function getPosColor(pos) {
  return POS_COLOR[pos] || POS_COLOR.other;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
