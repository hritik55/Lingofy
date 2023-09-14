class UtilityFunctions {
  getUserInitials(username?: string) {
    if (!username) return "XY";
    const words = username.split(" ");
    let initials = "";
    words.forEach((word) => {
      initials += word.charAt(0);
    });
    return initials;
  }
}

const Utility = new UtilityFunctions();

export default Utility;
