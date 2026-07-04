// Minimal protection for write routes (POST/PUT/DELETE).
// The frontend admin panel must send this header:
//   x-admin-key: <the ADMIN_KEY value from your .env>
// This is a lightweight scheme suitable for a course project.
// For a production app you would replace this with real authentication (JWT, sessions, etc).

function requireAdmin(req, res, next) {
  const providedKey = req.header("x-admin-key");

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ message: "Server misconfigured: ADMIN_KEY not set." });
  }

  if (!providedKey || providedKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized: missing or invalid admin key." });
  }

  next();
}

module.exports = requireAdmin;
