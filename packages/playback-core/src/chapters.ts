import type { Chapter } from './types';

type AppleJsonChapterTitle = {
  language: string;
  title: string;
};

type AppleJsonChapterEntry = {
  'start-time': number;
  duration?: number;
  titles?: AppleJsonChapterTitle[];
};

function toChapterTitle(titles?: AppleJsonChapterTitle[]): string {
  if (!titles?.length) return '';
  return (titles.find((title) => title.language === 'und') ?? titles[0]).title ?? '';
}

export function parseAppleJsonChapters(json: unknown): Chapter[] {
  if (!Array.isArray(json)) return [];

  return json
    .filter((entry): entry is AppleJsonChapterEntry => typeof entry?.['start-time'] === 'number')
    .map((entry, index, entries) => {
      const startTime = entry['start-time'];
      const nextStartTime = entries[index + 1]?.['start-time'];
      const endTime =
        typeof entry.duration === 'number'
          ? startTime + entry.duration
          : typeof nextStartTime === 'number'
            ? nextStartTime
            : undefined;

      return {
        startTime,
        ...(endTime != undefined ? { endTime } : {}),
        value: toChapterTitle(entry.titles),
      };
    })
    .filter((chapter) => chapter.value !== '');
}
