const ISO_CALENDAR_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export interface IstCalendarParts {
  y: number;
  mo: number;
  dy: number;
}

/** Calendar date in IST from YYYY-MM-DD or an ISO 8601 datetime string. */
export function extractIstCalendarParts(raw: string): IstCalendarParts {
  const trimmed = raw.trim();
  if (ISO_CALENDAR_DATE_ONLY.test(trimmed)) {
    const [y, mo, dy] = trimmed.split('-').map(Number);
    return { y, mo, dy };
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date: "${raw}"`);
  }

  const ist = new Date(parsed.getTime() + IST_OFFSET_MS);
  return {
    y: ist.getUTCFullYear(),
    mo: ist.getUTCMonth() + 1,
    dy: ist.getUTCDate(),
  };
}

/** 00:00:00.000 IST on the given calendar day (stored as UTC). */
export function startOfDayIst(raw: string): Date {
  const { y, mo, dy } = extractIstCalendarParts(raw);
  return new Date(Date.UTC(y, mo - 1, dy - 1, 18, 30, 0, 0));
}

/** 23:59:59.999 IST on the given calendar day (stored as UTC). */
export function endOfDayIst(raw: string): Date {
  const { y, mo, dy } = extractIstCalendarParts(raw);
  return new Date(Date.UTC(y, mo - 1, dy, 18, 29, 59, 999));
}

/** MongoDB range filter with inclusive IST day bounds for optional start/end inputs. */
export function buildIstDateRangeFilter(
  startDate?: string,
  endDate?: string,
): { $gte?: Date; $lte?: Date } {
  const filter: { $gte?: Date; $lte?: Date } = {};
  if (startDate) {
    filter.$gte = startOfDayIst(startDate);
  }
  if (endDate) {
    filter.$lte = endOfDayIst(endDate);
  }
  return filter;
}
