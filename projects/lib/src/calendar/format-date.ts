
//
// https://to-locale-date-string.stackblitz.io
//
export function formatDate(date: Date, options: any, locale = 'en-US') {
  return date.toLocaleDateString(locale, options);
}

/*
 options
 - dateStyle: "full", "long", "medium", "short"
 - timeStyle: "full, "long", "medium", "short"
 - fractionalSecondDigits: 0, 1, 2, 3
 - calendar: buddhist, chinese, optic, ethiopia, ethiopic, gregory, hebrew, indian, islamic, iso8601, japanese, persian, roc.
 - numberingSystem: “arab", "arabext", " bali", "beng", "deva", "fullwide", " gujr", "guru", "hanidec", "khmr", " knda", "laoo", "latn", "limb", "mlym", " mong", "mymr", "orya", "tamldec", " telu", "thai", "tibt"
 - localeMatcher: “lookup" and "best fit"(default)
 - timeZone: 'UTC', default (run-time timezone)
 - hour12: true or false (default, true or false by locale)
 - hourCycle: “h11", "h12", "h23", or "h24".
 - formatMatcher: “basic" and "best fit"(default)
 - weekday: “long"(Monday), “short"(Mon), “narrow"(M)
 - era: “long"(Anno Domini), “short"(AD), “narrow"(A)
 - year: “numeric"(2020), “2-digit"(20)
 - month: “numeric"(1), “2-digit"(01), “long"(January), “short"(Jan), “narrow" (J)
 - day: “numeric"(2), “2-digit"(02)
 - hour: “numeric"(2), “2-digit"(02)
 - minute: “numeric"(2), “2-digit"(02)
 - second: “numeric"(2), “2-digit"(02)
 - timeZoneName: “long"(Pacific Standard Time), "short"(PST)
*/