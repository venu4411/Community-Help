import { Request, Response } from 'express';
import { db } from '../db';
import * as bcrypt from 'bcrypt';


/* ================= USER REGISTRATION ================= */
export const registerUser = async (req: Request, res: Response) => {

  const {
    fullName,
    contact,
    location,
    username,
    password,
    role
  } = req.body;

  if (!fullName || !contact || !location || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // 🔍 Check existing user
    db.query(
      'SELECT id FROM users WHERE username = ?',
      [username],
      async (err, result: any[]) => {

        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
          return res.status(409).json({ message: 'Username already exists' });
        }

        // 🔐 Hash password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 💾 Insert user
        db.query(
          `INSERT INTO users 
           (full_name, contact, location, username, password, role)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            fullName,
            contact,
            location,
            username,
            hashedPassword,
            role || 'Resident'
          ],
          (insertErr) => {

            if (insertErr) {
              console.error(insertErr);
              return res.status(500).json({ message: 'Registration failed' });
            }

            res.status(201).json({
              message: 'User registered successfully'
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/* ================= HELPER REGISTRATION ================= */
export const registerHelper = async (req: Request, res: Response) => {

  const {
    fullName,
    contact,
    username,
    password,
    gender,
    age,
    qualification,
    location,
    helpType,
    priceType,
    price
  } = req.body;

  if (
    !fullName ||
    !contact ||
    !username ||
    !password ||
    !gender ||
    !age ||
    !qualification ||
    !location ||
    !helpType ||
    !priceType ||
    !price
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // 🔍 Check username
    db.query(
      'SELECT id FROM heplers WHERE username = ?',
      [username],
      async (err, result: any[]) => {

        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
          return res.status(409).json({ message: 'Username already exists' });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 💾 Insert helper
        db.query(
          `INSERT INTO heplers
           (full_name, username, password, contact, gender, age,
            qualification, location, help_type, price_type, price, role)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Helper')`,
          [
            fullName,
            username,
            hashedPassword,
            contact,
            gender,
            age,
            qualification,
            location,
            helpType,
            priceType,
            price
          ],
          (insertErr) => {

            if (insertErr) {
              console.error(insertErr);
              return res.status(500).json({ message: 'Registration failed' });
            }

            res.status(201).json({
              message: 'Helper registered successfully'
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
/* ================= PAYMENT + BOOKING ================= */
export const payAndBook = (req: Request, res: Response) => {

  console.log('🔥 PAYLOAD:', req.body);

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
  const time = bookingTime;

  /* 1️⃣ GET USERNAME */
  db.query(
    'SELECT username FROM users WHERE id = ?',
    [userId],
    (uErr: any, uRes: any[]) => {

      if (uErr || uRes.length === 0) {
        console.error('❌ USER ERROR:', uErr);
        return res.status(500).json({ message: 'User fetch failed' });
      }

      const username = uRes[0].username;

      /* 2️⃣ GET HELPER NAME (FROM heplers ✅) */
      db.query(
        'SELECT full_name FROM heplers WHERE id = ?',
        [helperId],
        (hErr: any, hRes: any[]) => {

          if (hErr || hRes.length === 0) {
            console.error('❌ HELPER ERROR:', hErr);
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
              time,
              location,
              price
            ],
            (bErr: any, bRes: any) => {

              if (bErr) {
                console.error('❌ BOOKING ERROR:', bErr);
                return res.status(500).json({ message: 'Booking failed' });
              }

              const bookingId = bRes.insertId;

              /* 4️⃣ INSERT PAYMENT (WITH booking_id ✅) */
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
                  time,
                  location,
                  paymentMethod,
                  price
                ],
                (pErr: any) => {

                  if (pErr) {
                    console.error('❌ PAYMENT ERROR:', pErr);
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

/* ================= USER TASKS ================= */
export const getTasksByUser = (req: Request, res: Response) => {
  const { username } = req.params;

  const sql = `
    SELECT *
    FROM payments
    WHERE username = ?
    ORDER BY calendar DESC, time DESC
  `;

  db.query(sql, [username], (err, rows) => {
    if (err) {
      console.error('USER TASK ERROR', err);
      return res.status(500).json({ message: 'Failed to load user tasks' });
    }
    res.json(rows);
  });
};

/* ================= HELPER TASKS ================= */
export const getTasksByHelper = (req: Request, res: Response) => {
  const { helpername } = req.params;

  const sql = `
    SELECT *
    FROM payments
    WHERE helpername = ?
    ORDER BY calendar DESC, time DESC
  `;

  db.query(sql, [helpername], (err, rows) => {
    if (err) {
      console.error('HELPER TASK ERROR', err);
      return res.status(500).json({ message: 'Failed to load helper tasks' });
    }
    res.json(rows);
  });
};


/* ================= COMPLETE TASK (USER ONLY) ================= */
export const completeTask = (req: Request, res: Response) => {
  const { paymentId } = req.body;

  const sql = `
    UPDATE payments
    SET task_status = 'completed'
    WHERE id = ?
  `;

  db.query(sql, [paymentId], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to complete task' });
    }
    res.json({ message: 'Task completed' });
  });
};

/* ================= RATE HELPER ================= */
export const rateHelper = (req: Request, res: Response) => {
  const { helpername, rating, review } = req.body;

  if (!helpername || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid rating' });
  }

  const sql = `
    UPDATE heplers
    SET rating = ?, review = ?
    WHERE full_name = ?
  `;

  db.query(sql, [rating, review || '', helpername], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Rating failed' });
    }
    res.json({ message: 'Rating saved' });
  });
};

/* ================= ADMIN LOGIN ================= */
export const adminLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const sql = `
    SELECT id, username
    FROM admins
    WHERE username = ? AND password = ?
    LIMIT 1
  `;

  db.query(sql, [username, password], (err, rows: any[]) => {
    if (err) {
      console.error('❌ ADMIN LOGIN ERROR:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    res.json({
      admin: rows[0]
    });
  });
};