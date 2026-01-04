const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_EXP_KEY = "access_token_exp";

export const setTokens = (
  accessToken: string,
  refreshToken: string,
  accessExpiresInMinutes = 15
) => {
    const expiresAt = Date.now() + accessExpiresInMinutes * 60 * 1000;

    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.setItem(ACCESS_EXP_KEY, expiresAt.toString());
};

export const getAccessToken = () => {
  const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const exp = sessionStorage.getItem(ACCESS_EXP_KEY);

  if (!token || !exp) return null;

  if (Date.now() > Number(exp)) {
    clearTokens();
    return null;
  }

  return token;
};

export const clearTokens = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_EXP_KEY);
};