import { assert, aTimeout } from '@open-wc/testing';
import { getStartDate, getCurrentPdt } from '../src/pdt';

describe('getCurrentPdt', function () {
  describe('with hls.js', function () {
    it('will return playingDate, if not null', function () {
      const time = Date.now();
      const currentPdt = getCurrentPdt(
        {},
        {
          playingDate: new Date(time),
        }
      );

      assert.equal(currentPdt.getTime(), time, 'the returned date matches the expected date');
    });

    it('will return an invalid date if playingDate is null', function () {
      const currentPdt = getCurrentPdt(
        {},
        {
          playingDate: null,
        }
      );

      assert.isNaN(currentPdt.getTime(), "the currentPdt's getTime() is NaN, which is an invalid time");
    });
  });

  describe('with native video', function () {
    it('will return invalid date if no getStartDate method', function () {
      const currentPdt = getCurrentPdt({}, {});

      assert.isNaN(currentPdt.getTime(), "the currentPdt's getTime() is NaN, which is an invalid time");
    });

    it('will return getStartDate plus currentTime', function () {
      const time = Date.now();
      let currentPdt = getCurrentPdt(
        {
          currentTime: 0,
          getStartDate() {
            return new Date(time);
          },
        },
        {}
      );

      assert.equal(
        currentPdt.getTime(),
        time,
        'with a currentTime of 0, getCurrentPdt is equivalent to getStartDate time'
      );

      currentPdt = getCurrentPdt(
        {
          currentTime: 60,
          getStartDate() {
            return new Date(time);
          },
        },
        {}
      );

      assert.equal(
        currentPdt.getTime(),
        time + 60 * 1000,
        'with a currentTime of 0, getCurrentPdt is equivalent to getStartDate time plus 60 seconds'
      );
    });
  });
});

describe('getStartDate', function () {
  describe('with hls.js', function () {
    it('will return a Date that is currentTime before playingDate', function () {
      const time = Date.now();
      let startDate = getStartDate(
        {
          currentTime: 0,
        },
        {
          playingDate: new Date(time),
        }
      );

      assert.equal(
        startDate.getTime(),
        time,
        'with a currentTime of zero, the returned date is equivalent to playingDate'
      );

      startDate = getStartDate(
        {
          currentTime: 60,
        },
        {
          playingDate: new Date(time),
        }
      );

      assert.equal(startDate.getTime(), time - 60 * 1000, 'the returned date should be 60 seconds before playingDate');
    });

    it('will return an invalid Date if playingDate is null', function () {
      const startDate = getStartDate(
        {
          currentTime: 60,
        },
        {
          playingDate: null,
        }
      );

      assert.isNaN(startDate.getTime(), 'NaN is an invalid date, when playingDate is null');
    });
  });

  describe('with native video', function () {
    it('will return invalid date if no getStartDate method', function () {
      const currentPdt = getCurrentPdt({}, {});

      assert.isNaN(currentPdt.getTime(), "the currentPdt's getTime() is NaN, which is an invalid time");
    });

    it('will return getStartDate', function () {
      const time = Date.now();
      const startDate = getStartDate(
        {
          currentTime: 60,
          getStartDate() {
            return new Date(time);
          },
        },
        {}
      );

      assert.equal(
        startDate.getTime(),
        time,
        'getCurrentPdt is equivalent to getStartDate time, regardless of currentTime'
      );
    });
  });
});
