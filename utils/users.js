/**
 * Generates a custom user ID.
 * @param {Array} users - List of existing users.
 * @param {string} prefix - ID prefix.
 * @param {number} padding - Number of digits for the ID part.
 * @returns {string} - The generated custom user ID.
 */
export function generateCustomUserId(users, prefix = "NorthInishowenPoolLeague", padding = 5) {
  let maxIdNum = 0;

  for (const user of users) {
    const userId = user.id || "";
    if (userId.startsWith(prefix)) {
      const numPart = userId.replace(prefix, "");
      if (/^\d+$/.test(numPart)) {
        maxIdNum = Math.max(maxIdNum, parseInt(numPart, 10));
      }
    }
  }

  const nextIdNum = maxIdNum + 1;
  return `${prefix}${nextIdNum.toString().padStart(padding, "0")}`;
}
