// backend/src/routes/auth.routes.ts
import { Router } from 'express';
import { db } from '../db';

const router = Router();

/* ================= REGISTER ================= */
router.post('/register', (req, res) => {
  const { fullName, contact, username, password, location, role } = req.body;

  const sql = `
    INSERT INTO users (full_name, contact, username, password, location, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [fullName, contact, username, password, location, role || 'Resident'],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Registration failed' });
      }
      res.json({ message: 'User registered successfully' });
    }
  );
});

/* ================= LOGIN (FIXED) ================= */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `
    SELECT id, full_name, contact, location, role, username
    FROM users
    WHERE username = ? AND password = ?
  `;

  db.query(sql, [username, password], (err, results: any[]) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // ✅ SUCCESS
    res.json({
      user: results[0]
    });
  });
});

export default router;
