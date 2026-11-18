export const safeLog = (value) => String(value).replace(/[\x00-\x1f\x7f-\x9f]/g, ' ');
