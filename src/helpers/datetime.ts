export const APP_TIMEZONE = 'Asia/Ho_Chi_Minh';

type DateInput = string | number | Date | null | undefined;

const toDate = (value: DateInput): Date | undefined => {
    if (value == null || value === '') return undefined;
    const d = value instanceof Date ? value : new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
};

export const formatTime = (value: DateInput, fallback = '--:--') => {
    const d = toDate(value);
    if (!d) return fallback;
    return d.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: APP_TIMEZONE,
    });
};

export const formatDate = (value: DateInput, fallback = '--') => {
    const d = toDate(value);
    if (!d) return fallback;
    return d.toLocaleDateString('en-GB', { timeZone: APP_TIMEZONE });
};

export const formatLongDate = (value: DateInput = new Date(), locale = 'en-US') => {
    const d = toDate(value) ?? new Date();
    return d.toLocaleDateString(locale, { dateStyle: 'full', timeZone: APP_TIMEZONE });
};

export const toDateKey = (value: DateInput): string | undefined => {
    const d = toDate(value);
    if (!d) return undefined;
    return d.toLocaleDateString('en-CA', { timeZone: APP_TIMEZONE });
};

export const toMonthKey = (value: DateInput = new Date()): string =>
    toDateKey(value)?.slice(0, 7) ?? '';

export const getWeekday = (value: DateInput = new Date()): number => {
    const d = toDate(value) ?? new Date();
    const name = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: APP_TIMEZONE });
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(name);
};

export const getHour = (value: DateInput = new Date()): number => {
    const d = toDate(value) ?? new Date();
    return Number(d.toLocaleTimeString('en-GB', { hour: '2-digit', hour12: false, timeZone: APP_TIMEZONE }));
};

export const isSameDay = (a: DateInput, b: DateInput = new Date()) => {
    const ka = toDateKey(a);
    const kb = toDateKey(b);
    return !!ka && ka === kb;
};

export const isToday = (value: DateInput) => isSameDay(value, new Date());

export const diffMinutes = (start: DateInput, end: DateInput): number | undefined => {
    const s = toDate(start);
    const e = toDate(end);
    if (!s || !e) return undefined;
    return Math.max(0, Math.floor((e.getTime() - s.getTime()) / 60000));
};

export const formatDuration = (start: DateInput, end: DateInput, fallback = '--') => {
    const mins = diffMinutes(start, end);
    if (mins === undefined) return fallback;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};
