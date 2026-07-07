import { uid } from '../utils/helpers.js';

export const STORAGE_KEY = 'vocab-lab-entries';

export const SEED = [
  { id: uid(), word: 'captain', pos: 'n', meaning: 'đội trưởng', example: 'She was chosen as captain of the school volleyball team.', pattern: '', collocation: 'team captain', topic: 'Fun and games' },
  { id: uid(), word: 'board game', pos: 'n phr', meaning: 'trò chơi bàn cờ', example: 'Monopoly is my favorite board game.', pattern: '', collocation: '', topic: 'Fun and games' },
  { id: uid(), word: 'beat', pos: 'v', meaning: 'đánh bại', example: 'No one beats him at chess.', pattern: 'beat sb at sth', collocation: '', topic: 'Fun and games' },
  { id: uid(), word: 'bored', pos: 'adj', meaning: 'chán', example: "I'm bored with this game.", pattern: 'bored with', collocation: '', topic: 'Fun and games' },
  { id: uid(), word: 'crazy', pos: 'adj', meaning: 'mê, cuồng', example: "She's crazy about K-pop.", pattern: 'crazy about', collocation: '', topic: 'Fun and games' },
  { id: uid(), word: 'keen', pos: 'adj', meaning: 'thích, đam mê', example: "They're keen on hiking.", pattern: 'keen on', collocation: '', topic: 'Fun and games' },
  { id: uid(), word: 'fan', pos: 'n', meaning: 'người hâm mộ', example: "I'm a big fan of Messi.", pattern: 'a fan of', collocation: '', topic: 'Fun and games' },
  { id: uid(), word: 'give up', pos: 'v phr', meaning: 'từ bỏ', example: 'He gave up smoking last year.', pattern: 'give up + V-ing', collocation: '', topic: 'Fun and games' },
];

export const EMPTY_FORM = { word: '', pos: 'n', meaning: '', example: '', pattern: '', collocation: '', topic: '' };
