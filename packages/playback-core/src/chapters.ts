import type { Chapter } from './types';

type AppleJsonChapterTitle = {
  language?: string | null;
  title: string;
};

type AppleJsonChapterEntry = {
  'start-time': number;
  duration?: number;
  titles?: AppleJsonChapterTitle[];
};

const primarySubtag = (languageTag: string) => languageTag.split('-')[0];

const toLanguageTag = ({ language }: AppleJsonChapterTitle) =>
  typeof language === 'string' ? language.toLowerCase() : undefined;

function findTitleInLanguage(titles: AppleJsonChapterTitle[], languageTag: string) {
  const tag = languageTag.toLowerCase();
  return (
    titles.find((title) => toLanguageTag(title) === tag) ??
    titles.find((title) => {
      const titleTag = toLanguageTag(title);
      return titleTag !== undefined && primarySubtag(titleTag) === primarySubtag(tag);
    })
  );
}

function toChapterTitle(titles: AppleJsonChapterTitle[] | undefined, preferredLanguages: readonly string[]): string {
  const usableTitles = (Array.isArray(titles) ? titles : []).filter(
    (title) => typeof title?.title === 'string' && title.title !== ''
  );
  if (!usableTitles.length) return '';

  for (const languageTag of preferredLanguages) {
    const title = findTitleInLanguage(usableTitles, languageTag);
    if (title) return title.title;
  }
  return (usableTitles.find((title) => toLanguageTag(title) === 'und') ?? usableTitles[0]).title;
}

export function parseAppleJsonChapters(json: unknown, preferredLanguages: readonly string[] = []): Chapter[] {
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
        value: toChapterTitle(entry.titles, preferredLanguages),
      };
    })
    .filter((chapter) => chapter.value !== '');
}
