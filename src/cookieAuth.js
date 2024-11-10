import Cookies from "js-cookie";

export const cookieAuth = {
  isAuthenticated: () => {
    const adonisSession = Cookies.get("adonis-session");
    console.log(adonisSession);
    if (!adonisSession) return false;

    // Find the dynamic session cookie
    const allCookies = document.cookie.split(";");
    const sessionCookie = allCookies.find((cookie) => {
      const [name] = cookie.trim().split("=");
      return name.length === 25 && name !== "adonis-session";
    });

    return !!sessionCookie;
  },

  getSessionCookieName: () => {
    const allCookies = document.cookie.split(";");
    const sessionCookie = allCookies.find((cookie) => {
      const [name] = cookie.trim().split("=");
      return name.length === 25 && name !== "adonis-session";
    });
    return sessionCookie ? sessionCookie.split("=")[0].trim() : null;
  },

  clearAuthCookies: () => {
    const sessionCookieName = cookieAuth.getSessionCookieName();
    if (sessionCookieName) {
      Cookies.remove(sessionCookieName);
    }
    Cookies.remove("adonis-session");
  },
};
