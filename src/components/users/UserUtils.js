export const extractUsers = (payload) => {
  if (Array.isArray(payload)) return payload;
  const candidates = [
    payload?.users,
    payload?.data,
    payload?.data?.users,
    payload?.results,
    payload?.items,
  ];
  return candidates.find(Array.isArray) ?? [];
};

export const normalizeUser = (u) => ({
  id: u._id ?? u.id,
  name: u.username ?? u.name ?? "-",
  email: u.email ?? "",
  phone: u.phone ?? "",
  role: String(u.role ?? "customer").toLowerCase(),
  verified: Boolean(u.isVerified ?? u.verified ?? u.emailVerified ?? false),
});

export const getErrorMessage = (err) => {
  if (err?.code === "ECONNABORTED" || err?.code === "ETIMEDOUT") {
    return "The server took too long to respond. Your connection may be slow.";
  }
  if (!err?.response) {
    return navigator.onLine
      ? "Can't reach the server. Please try again."
      : "You're offline. Check your internet connection.";
  }
  return err.response.data?.message || `Something went wrong (${err.response.status}).`;
};