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
      role
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
    `SELECT id, full_name AS fullName, username, contact, location, role
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
  const { fullName, username, contact, location, price, password, gender } = req.body;

  if (role === 'helper') {
    db.query(
      `UPDATE heplers
       SET full_name = ?, 
           username = ?, 
           contact = ?, 
           price = ?, 
           gender = ?, 
           password = ?
       WHERE id = ?`,
      [fullName, username, contact, price, gender, password, id],
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
       SET full_name = ?, 
           username = ?, 
           contact = ?, 
           location = ?, 
           gender = ?, 
           password = ?
       WHERE id = ?`,
      [fullName, username, contact, location, gender, password, id],
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


/* ================= GET HELPERS BY TYPE ================= */
export const getHelpersByType = (req: Request, res: Response) => {
  const { type } = req.params;

  db.query(
    `SELECT
        id,
        full_name AS fullName,
        contact,
        gender,
        age,                  -- ✅ ADD THIS
        qualification,
        location,
        price_type AS priceType,
        price,
        help_type AS helpType
     FROM heplers
     WHERE help_type LIKE ?`,
    [`%${type}%`],
    (err, result: any[]) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch helpers' });
      }
      res.json(result);
    }
  );
};



/* ================= PAYMENT + BOOKING ================= */
export const payAndBook = (req: Request, res: Response) => {

  console.log('PAYLOAD RECEIVED:', req.body);

  const {
    userId,
    helperId,
    serviceType,
    bookingDate,
    bookingTime,
    location,
    price,
    paymentMethod
  } = req.body;

  if (
    !userId ||
    !helperId ||
    !serviceType ||
    !bookingDate ||
    !bookingTime ||
    !location ||
    !price ||
    !paymentMethod
  ) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  const calendar = new Date(bookingDate).toISOString().split('T')[0];

  /* 1️⃣ GET USERNAME */
  db.query(
    `SELECT username FROM users WHERE id = ?`,
    [userId],
    (uErr: any, uRes: any[]) => {

      if (uErr || uRes.length === 0) {
        console.error('❌ USER FETCH ERROR', uErr);
        return res.status(500).json({ message: 'User fetch failed' });
      }

      const username = uRes[0].username;

      /* 2️⃣ GET HELPER NAME */
      db.query(
        `SELECT full_name FROM heplers WHERE id = ?`,
        [helperId],
        (hErr: any, hRes: any[]) => {

          if (hErr || hRes.length === 0) {
            console.error('❌ HELPER FETCH ERROR', hErr);
            return res.status(500).json({ message: 'Helper fetch failed' });
          }

          const helpername = hRes[0].full_name;

          /* 3️⃣ INSERT BOOKING */
          db.query(
            `INSERT INTO bookings
             (user_id, helper_id, service_type, booking_date, booking_time, location, price, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'Confirmed')`,
            [
              userId,
              helperId,
              serviceType,
              calendar,
              bookingTime,
              location,
              price
            ],
            (bErr: any, bRes: any) => {

              if (bErr) {
                console.error('❌ BOOKING ERROR', bErr);
                return res.status(500).json({ message: 'Booking failed' });
              }

              const bookingId = bRes.insertId;

              /* 4️⃣ INSERT PAYMENT (FULL DATA) */
              db.query(
                `INSERT INTO payments
                 (booking_id, username, helpername, calendar, time, location,
                  payment_method, amount, payment_status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'success')`,
                [
                  bookingId,
                  username,
                  helpername,
                  calendar,
                  bookingTime,
                  location,
                  paymentMethod,
                  price
                ],
                (pErr: any) => {

                  if (pErr) {
                    console.error('❌ PAYMENT ERROR', pErr);
                    return res.status(500).json({ message: 'Payment failed' });
                  }

                  res.json({
                    message: 'Payment successful & booking confirmed',
                    bookingId
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

