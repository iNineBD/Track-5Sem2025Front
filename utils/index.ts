export const formatDate = (
  date: string | Date,
  locale = "pt-BR",
  options = {
    day: "numeric" as const,
    month: "numeric" as const,
    year: "numeric" as const,
  },
) => {
  return new Date(date).toLocaleDateString(locale, options);
};

export const differenceBetweenDays = (
  createdDate: string,
  finishDate: string | null,
) => {
  const startDate = new Date(createdDate);
  const endDate = finishDate ? new Date(finishDate) : new Date();
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const daysAgo = (modifiedDate: string) => {
  const modified = new Date(modifiedDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - modified.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
export const capitalizeName = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ").slice(0, 2);
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};
