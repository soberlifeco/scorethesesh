/**
 * Some early accounts ended up with an email address stored as their
 * username. Anywhere a username is displayed, this strips it down to
 * just the part before "@" so nobody's email shows up on the site.
 */
export function displayUsername(username: string): string {
  const at = username.indexOf("@");
  return at > 0 ? username.slice(0, at) : username;
}
