function isPageButtonDisabled(link: string | null | undefined): boolean {
  if (Object.is(link, null) || link === undefined) return true;
  else return false;
}

export default isPageButtonDisabled;
