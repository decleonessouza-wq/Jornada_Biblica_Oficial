import {
  DAILY_CONTENT_720_CYCLE_DAYS,
  getDailyContent720ByCycleDay,
  getDailyNotification720ByCycleDay,
  getDailyVerse720ByCycleDay,
  getDailyVerseBibleReference720ByCycleDay,
} from "../src/services/dailyContent720";

describe("dailyContent720", () => {
  it("exposes the audited 720-day cycle", () => {
    expect(DAILY_CONTENT_720_CYCLE_DAYS).toBe(720);
  });

  it("maps day 1 to the expected canonical verse and paired notification", () => {
    const content = getDailyContent720ByCycleDay(1);

    expect(content.cycleDay).toBe(1);
    expect(content.verse).toMatchObject({
      day: 1,
      themeId: "palavra_de_deus",
      bookId: "PSA",
      chapter: 1,
      verse: 1,
      reference: "Salmos 1:1",
    });
    expect(content.notification).toMatchObject({
      day: 1,
      style: "motivadora",
      themeId: "palavra_de_deus",
      biblicalReference: "Salmos 1:1",
      biblicalReferenceKey: {
        bookId: "PSA",
        chapter: 1,
        verse: 1,
      },
    });
    expect(content.bibleReference).toEqual({
      passages: [
        {
          kind: "VERSE",
          bookId: "PSA",
          chapter: 1,
          verse: 1,
        },
      ],
    });
  });

  it("keeps all 720 verse and notification entries aligned by cycle day", () => {
    for (let cycleDay = 1; cycleDay <= 720; cycleDay += 1) {
      const verse = getDailyVerse720ByCycleDay(cycleDay);
      const notification = getDailyNotification720ByCycleDay(cycleDay);
      const reference =
        getDailyVerseBibleReference720ByCycleDay(cycleDay);
      const paired = getDailyContent720ByCycleDay(cycleDay);

      expect(verse.day).toBe(cycleDay);
      expect(notification.day).toBe(cycleDay);
      expect(notification.themeId).toBe(verse.themeId);
      expect(notification.theme).toBe(verse.theme);
      expect(notification.biblicalReference).toBe(verse.reference);
      expect(notification.biblicalReferenceKey).toEqual({
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
      });
      expect(reference).toEqual({
        passages: [
          {
            kind: "VERSE",
            bookId: verse.bookId,
            chapter: verse.chapter,
            verse: verse.verse,
          },
        ],
      });
      expect(paired.verse).toEqual(verse);
      expect(paired.notification).toEqual(notification);
      expect(paired.bibleReference).toEqual(reference);
    }
  });

  it("keeps the final cycle entry addressable without wrapping or truncation", () => {
    const content = getDailyContent720ByCycleDay(720);

    expect(content.cycleDay).toBe(720);
    expect(content.verse.day).toBe(720);
    expect(content.notification.day).toBe(720);
    expect(content.verse.reference).toBe(
      content.notification.biblicalReference,
    );
  });

  it.each([0, -1, 721, 1.5, Number.NaN])(
    "fails closed for invalid cycle day %s",
    (cycleDay) => {
      expect(() => getDailyContent720ByCycleDay(cycleDay)).toThrow(
        "DAILY_CONTENT_720_INVALID_CYCLE_DAY",
      );
    },
  );
});
