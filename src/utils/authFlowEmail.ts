const OTP_EMAIL_KEY = "auth_flow_email";
const OTP_EMAIL_EXP_KEY = "auth_flow_email_exp";

const RESET_TOKEN_KEY = "auth_flow_reset_token";
const RESET_TOKEN_EXP_KEY = "auth_flow_reset_token_exp";

export const setAuthFlowEmail = (email: string, expiresInMinutes = 15) => {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;

  sessionStorage.setItem(OTP_EMAIL_KEY, email);
  sessionStorage.setItem(OTP_EMAIL_EXP_KEY, expiresAt.toString());
};

export const clearAuthFlowEmail = () => {
  sessionStorage.removeItem(OTP_EMAIL_KEY);
  sessionStorage.removeItem(OTP_EMAIL_EXP_KEY);
};

export const getAuthFlowEmail = (): string | null => {
  const email = sessionStorage.getItem(OTP_EMAIL_KEY);
  const exp = sessionStorage.getItem(OTP_EMAIL_EXP_KEY);

  if (!email || !exp) return null;

  if (Date.now() > Number(exp)) {
    clearAuthFlowEmail();
    return null;
  }

  return email;
};

export const setResetToken = (token: string, expiresInMinutes = 15) => {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;

  sessionStorage.setItem(RESET_TOKEN_KEY, token);
  sessionStorage.setItem(RESET_TOKEN_EXP_KEY, expiresAt.toString());
};

export const getResetToken = (): string | null => {
  const token = sessionStorage.getItem(RESET_TOKEN_KEY);
  const exp = sessionStorage.getItem(RESET_TOKEN_EXP_KEY);

  if (!token || !exp) return null;

  if (Date.now() > Number(exp)) {
    clearResetToken();
    return null;
  }
  return token;
};

export const clearResetToken = () => {
  sessionStorage.removeItem(RESET_TOKEN_KEY);
  sessionStorage.removeItem(RESET_TOKEN_EXP_KEY);
};
