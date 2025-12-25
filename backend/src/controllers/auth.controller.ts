import { Request, Response } from 'express';
import { db } from '../db';

/* ================= HELPER LOGIN ================= */
export const loginHelper = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const sql = `
    SELECT
      id,
      full_name AS fullName,
      username,
      contact,
      gender,
      age,
      qualification,
      location,
      help_type AS helpType,
      price_type AS priceType,
      price,
      role,
      password
    FROM heplers
    WHERE username = ? AND password = ?
  `;

  db.query(sql, [username, password], (err, result: any[]) => {
    if (err) {
      console.error('LOGIN ERROR:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid helper credentials' });
    }

    res.json({ user: result[0] });
  });
};


/* ================= USER LOGIN ================= */
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  db.query(
    `SELECT id, full_name AS fullName, username, contact, location, role, password
     FROM users
     WHERE username=? AND password=?`,
    [username, password],
    (err, result: any[]) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.json({ user: result[0] });
    }
  );
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = (req: Request, res: Response) => {
  const { role, id } = req.params;
  const { fullName, username, contact, location, price, password } = req.body;

  if (role === 'Helper') {
    db.query(
      `UPDATE heplers
       SET full_name=?, username=?, contact=?, price=?, password=?
       WHERE id=?`,
      [fullName, username, contact, price, password, id],
      err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Update failed' });
        }
        res.json({ message: 'Successfully updated' });
      }
    );
  } else {
    db.query(
      `UPDATE users
       SET full_name=?, username=?, contact=?, location=?, password=?
       WHERE id=?`,
      [fullName, username, contact, location, password, id],
      err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Update failed' });
        }
        res.json({ message: 'Successfully updated' });
      }
    );
  }
};
