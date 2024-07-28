function isValidPageNumber(page: string | null): boolean {
  const pageNum = Number(page);

  if (pageNum && pageNum > 0) return true;
  else return false;
}

export default isValidPageNumber;
