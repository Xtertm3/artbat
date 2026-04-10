import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDirectory, 'lssm.db');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const HASH_ROUNDS = 10;
export let db;

function parseJson(value) {

  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function mapCourseRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    shortDescription: row.shortDescription,
    thumbnail: row.thumbnail,
    category: row.category,
    subcategory: row.subcategory,
    level: row.level,
    language: row.language,
    price: row.price,
    originalPrice: row.originalPrice,
    instructor: {
      id: row.instructorId,
      name: row.instructorName,
      rating: row.instructorRating,
    },
    rating: row.rating,
    totalReviews: row.totalReviews,
    totalStudents: row.totalStudents,
    totalLessons: row.totalLessons,
    totalDuration: row.totalDuration,
    modules: parseJson(row.modules),
    tags: parseJson(row.tags),
    isPublished: Boolean(row.isPublished),
    isFeatured: Boolean(row.isFeatured),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapUserRow(row) {
  if (!row) return null;
  const { password, ...user } = row;
  return {
    ...user,
    isVerified: Boolean(row.isVerified),
  };
}

function mapEnrollmentRow(row, includeCourse = false) {
  if (!row) return null;
  const enrollment = {
    id: row.id,
    courseId: row.courseId,
    userId: row.userId,
    enrolledAt: row.enrolledAt,
    progress: row.progress,
    completedLessons: parseJson(row.completedLessons),
    lastAccessedAt: row.lastAccessedAt,
  };
  if (includeCourse) {
    enrollment.course = {
      id: row.courseId,
      title: row.courseTitle,
      shortDescription: row.courseShortDescription,
      thumbnail: row.courseThumbnail,
      category: row.courseCategory,
      subcategory: row.courseSubcategory,
      level: row.courseLevel,
      language: row.courseLanguage,
      price: row.coursePrice,
      originalPrice: row.courseOriginalPrice,
      instructor: {
        id: row.courseInstructorId,
        name: row.courseInstructorName,
        rating: row.courseInstructorRating,
      },
      rating: row.courseRating,
      totalReviews: row.courseTotalReviews,
      totalStudents: row.courseTotalStudents,
      totalLessons: row.courseTotalLessons,
      totalDuration: row.courseTotalDuration,
      modules: parseJson(row.courseModules),
      tags: parseJson(row.courseTags),
      isPublished: Boolean(row.courseIsPublished),
      isFeatured: Boolean(row.courseIsFeatured),
      createdAt: row.courseCreatedAt,
      updatedAt: row.courseUpdatedAt,
    };
  }
  return enrollment;
}

function mapReviewRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    courseId: row.courseId,
    userId: row.userId,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.createdAt,
  };
}

export function initializeDatabase() {
  try {
    console.log('[DB] Initializing database at:', dbFile);
    db = new Database(dbFile);
    db.pragma('journal_mode = WAL');


    db.exec(`
      CREATE TABLE IF NOT EXISTS users (

      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      avatar TEXT,
      isVerified INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      shortDescription TEXT NOT NULL,
      thumbnail TEXT,
      category TEXT NOT NULL,
      subcategory TEXT NOT NULL,
      level TEXT NOT NULL,
      language TEXT NOT NULL,
      price REAL NOT NULL,
      originalPrice REAL NOT NULL,
      instructorId TEXT NOT NULL,
      instructorName TEXT NOT NULL,
      instructorRating REAL NOT NULL,
      rating REAL NOT NULL,
      totalReviews INTEGER NOT NULL,
      totalStudents INTEGER NOT NULL,
      totalLessons INTEGER NOT NULL,
      totalDuration INTEGER NOT NULL,
      modules TEXT,
      tags TEXT,
      isPublished INTEGER NOT NULL,
      isFeatured INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (instructorId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      courseId TEXT NOT NULL,
      enrolledAt TEXT NOT NULL,
      progress INTEGER NOT NULL,
      completedLessons TEXT,
      lastAccessedAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (courseId) REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      courseId TEXT NOT NULL,
      userId TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (courseId) REFERENCES courses(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  const adminEmail = 'admin@lssm.in';
  const instructorEmail = 'instructor@lssm.in';
  const studentEmail = 'student@lssm.in';

  const hasAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (!hasAdmin) {
    const now = new Date().toISOString();
    const insertUser = db.prepare(
      'INSERT INTO users (id, name, email, password, role, avatar, isVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertUser.run('admin-1', 'Admin User', adminEmail, bcrypt.hashSync('Admin123!', HASH_ROUNDS), 'admin', '', 1, now, now);
    insertUser.run('inst-1', 'Priya Sharma', instructorEmail, bcrypt.hashSync('Instructor123!', HASH_ROUNDS), 'instructor', '', 1, now, now);
    insertUser.run('student-1', 'Arjun Mehta', studentEmail, bcrypt.hashSync('Student123!', HASH_ROUNDS), 'student', '', 1, now, now);
  }

  const courseCount = db.prepare('SELECT COUNT(1) AS count FROM courses').get().count;
  if (courseCount === 0) {
    const now = new Date().toISOString();
    const insertCourse = db.prepare(
      `INSERT INTO courses (id, title, description, shortDescription, thumbnail, category, subcategory, level, language, price, originalPrice, instructorId, instructorName, instructorRating, rating, totalReviews, totalStudents, totalLessons, totalDuration, modules, tags, isPublished, isFeatured, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    insertCourse.run(
      'course-tabla-101',
      'Tabla for Beginners',
      'Learn the foundations of tabla with hands-on guided sessions.',
      'Build strong tabla basics with daily practice.',
      '',
      'music',
      'tabla',
      'beginner',
      'Hindi',
      1299,
      2499,
      'inst-1',
      'Pandit Rajan Misra',
      4.9,
      4.9,
      612,
      9800,
      30,
      450,
      JSON.stringify([]),
      JSON.stringify(['tabla', 'rhythm']),
      1,
      1,
      now,
      now
    );

    insertCourse.run(
      'course-bharatanatyam-101',
      'Bharatanatyam Foundations',
      'Start your Bharatanatyam journey with clean technique and posture.',
      'Master adavus and flow from day one.',
      '',
      'dance',
      'bharatanatyam',
      'beginner',
      'Tamil',
      1299,
      2499,
      'inst-1',
      'Savitha Narayanan',
      4.9,
      4.9,
      748,
      11230,
      36,
      540,
      JSON.stringify([]),
      JSON.stringify(['dance', 'classical']),
      1,
      1,
      now,
      now
    );

    insertCourse.run(
      'course-hindustani-101',
      'Hindustani Classical Vocals',
      'Build sur, taal, and voice control with structured riyaz routines.',
      'Classical vocal training with practical riyaz plans.',
      '',
      'vocals',
      'hindustani',
      'beginner',
      'Hindi',
      1499,
      2999,
      'inst-1',
      'Pt. Jasraj Das',
      5.0,
      5.0,
      934,
      15800,
      42,
      630,
      JSON.stringify([]),
      JSON.stringify(['vocals', 'riyaz']),
      1,
      1,
      now,
      now
    );
  }
} catch (error) {
  console.error('[DB ERROR] Initialization failed:', error);
  throw error; 
}
}



export function hashPassword(password) {
  return bcrypt.hashSync(password, HASH_ROUNDS);
}

export function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function getUserByEmail(email, includePassword = false) {
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!row) return null;
  if (includePassword) {
    return row;
  }
  return mapUserRow(row);
}

export function getUserById(id) {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  return mapUserRow(row);
}

export function createUser({ name, email, password, role }) {
  const userId = `user-${randomUUID()}`;
  const now = new Date().toISOString();
  const hashedPassword = hashPassword(password);
  db.prepare(
    'INSERT INTO users (id, name, email, password, role, avatar, isVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(userId, name, email, hashedPassword, role, '', 1, now, now);

  return getUserById(userId);
}

export function getCourses({ category, level, search, language }) {
  const conditions = ['c.isPublished = 1'];
  const params = [];

  if (category) {
    conditions.push('c.category = ?');
    params.push(category);
  }
  if (level) {
    conditions.push('c.level = ?');
    params.push(level);
  }
  if (language) {
    conditions.push('c.language = ?');
    params.push(language);
  }
  if (search) {
    const term = `%${String(search).toLowerCase()}%`;
    conditions.push(
      '(LOWER(c.title) LIKE ? OR LOWER(c.description) LIKE ? OR LOWER(c.shortDescription) LIKE ? OR LOWER(c.subcategory) LIKE ? OR LOWER(c.instructorName) LIKE ?)' 
    );
    params.push(term, term, term, term, term);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const rows = db
    .prepare(
      `SELECT c.*, u.name AS instructorName, u.role AS instructorRole
       FROM courses c
       JOIN users u ON c.instructorId = u.id
       ${whereClause}
       ORDER BY c.isFeatured DESC, c.createdAt DESC`
    )
    .all(...params);

  return {
    courses: rows.map(mapCourseRow),
    total: rows.length,
  };
}

export function getCourseById(id) {
  const row = db
    .prepare(
      `SELECT c.*, u.name AS instructorName, u.role AS instructorRole
       FROM courses c
       JOIN users u ON c.instructorId = u.id
       WHERE c.id = ?`
    )
    .get(id);

  return mapCourseRow(row);
}

export function createCourse(courseInput, instructor) {
  const courseId = `course-${randomUUID()}`;
  const now = new Date().toISOString();
  const data = {
    title: courseInput.title || 'Untitled Course',
    description: courseInput.description || '',
    shortDescription: courseInput.shortDescription || '',
    thumbnail: courseInput.thumbnail || '',
    category: courseInput.category || 'general',
    subcategory: courseInput.subcategory || 'general',
    level: courseInput.level || 'beginner',
    language: courseInput.language || 'English',
    price: typeof courseInput.price === 'number' ? courseInput.price : 0,
    originalPrice: typeof courseInput.originalPrice === 'number' ? courseInput.originalPrice : 0,
    totalLessons: typeof courseInput.totalLessons === 'number' ? courseInput.totalLessons : 0,
    totalDuration: typeof courseInput.totalDuration === 'number' ? courseInput.totalDuration : 0,
    modules: courseInput.modules || [],
    tags: courseInput.tags || [],
    isPublished: courseInput.isPublished ? 1 : 0,
    isFeatured: courseInput.isFeatured ? 1 : 0,
  };

  db.prepare(
    `INSERT INTO courses (id, title, description, shortDescription, thumbnail, category, subcategory, level, language, price, originalPrice, instructorId, instructorName, instructorRating, rating, totalReviews, totalStudents, totalLessons, totalDuration, modules, tags, isPublished, isFeatured, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    courseId,
    data.title,
    data.description,
    data.shortDescription,
    data.thumbnail,
    data.category,
    data.subcategory,
    data.level,
    data.language,
    data.price,
    data.originalPrice,
    instructor.id,
    instructor.name,
    instructor.rating || 0,
    0,
    0,
    0,
    data.totalLessons,
    data.totalDuration,
    JSON.stringify(data.modules),
    JSON.stringify(data.tags),
    data.isPublished,
    data.isFeatured,
    now,
    now
  );

  return getCourseById(courseId);
}

export function updateCourse(id, updates, user) {
  const course = getCourseById(id);
  if (!course) return null;
  if (user.role !== 'admin' && course.instructor.id !== user.id) {
    return null;
  }

  const fields = [];
  const values = [];
  const textFields = [
    'title',
    'description',
    'shortDescription',
    'thumbnail',
    'category',
    'subcategory',
    'level',
    'language',
  ];
  for (const field of textFields) {
    if (typeof updates[field] === 'string') {
      fields.push(`${field} = ?`);
      values.push(updates[field]);
    }
  }

  if (typeof updates.price === 'number') {
    fields.push('price = ?');
    values.push(updates.price);
  }
  if (typeof updates.originalPrice === 'number') {
    fields.push('originalPrice = ?');
    values.push(updates.originalPrice);
  }
  if (typeof updates.totalLessons === 'number') {
    fields.push('totalLessons = ?');
    values.push(updates.totalLessons);
  }
  if (typeof updates.totalDuration === 'number') {
    fields.push('totalDuration = ?');
    values.push(updates.totalDuration);
  }
  if (Array.isArray(updates.modules)) {
    fields.push('modules = ?');
    values.push(JSON.stringify(updates.modules));
  }
  if (Array.isArray(updates.tags)) {
    fields.push('tags = ?');
    values.push(JSON.stringify(updates.tags));
  }
  if (typeof updates.isPublished === 'boolean') {
    fields.push('isPublished = ?');
    values.push(updates.isPublished ? 1 : 0);
  }
  if (typeof updates.isFeatured === 'boolean') {
    fields.push('isFeatured = ?');
    values.push(updates.isFeatured ? 1 : 0);
  }

  if (fields.length === 0) {
    return course;
  }

  fields.push('updatedAt = ?');
  values.push(new Date().toISOString());
  values.push(id);

  db.prepare(`UPDATE courses SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  return getCourseById(id);
}

export function deleteCourse(id, user) {
  const course = getCourseById(id);
  if (!course) return false;
  if (user.role !== 'admin' && course.instructor.id !== user.id) {
    return false;
  }

  db.prepare('DELETE FROM courses WHERE id = ?').run(id);
  db.prepare('DELETE FROM enrollments WHERE courseId = ?').run(id);
  db.prepare('DELETE FROM reviews WHERE courseId = ?').run(id);
  return true;
}

export function getInstructorCourses(instructorId, role) {
  const rows = db
    .prepare(
      role === 'admin'
        ? `SELECT c.*, u.name AS instructorName FROM courses c JOIN users u ON c.instructorId = u.id ORDER BY c.updatedAt DESC`
        : `SELECT c.*, u.name AS instructorName FROM courses c JOIN users u ON c.instructorId = u.id WHERE c.instructorId = ? ORDER BY c.updatedAt DESC`
    )
    .all(role === 'admin' ? [] : [instructorId]);
  return rows.map(mapCourseRow);
}

export function createEnrollment(userId, courseId) {
  const course = getCourseById(courseId);
  if (!course) return null;

  const existing = db
    .prepare('SELECT id FROM enrollments WHERE userId = ? AND courseId = ?')
    .get(userId, courseId);
  if (existing) {
    return getEnrollmentByUserCourse(userId, courseId);
  }

  const id = `en-${randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(
    'INSERT INTO enrollments (id, userId, courseId, enrolledAt, progress, completedLessons, lastAccessedAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(id, userId, courseId, now, 0, JSON.stringify([]), now);

  return getEnrollmentByUserCourse(userId, courseId);
}

export function getEnrollmentsByUser(userId) {
  const rows = db
    .prepare(
      `SELECT e.*, c.title AS courseTitle, c.shortDescription AS courseShortDescription, c.thumbnail AS courseThumbnail,
              c.category AS courseCategory, c.subcategory AS courseSubcategory, c.level AS courseLevel, c.language AS courseLanguage,
              c.price AS coursePrice, c.originalPrice AS courseOriginalPrice, c.instructorId AS courseInstructorId,
              c.instructorName AS courseInstructorName, c.instructorRating AS courseInstructorRating, c.rating AS courseRating,
              c.totalReviews AS courseTotalReviews, c.totalStudents AS courseTotalStudents, c.totalLessons AS courseTotalLessons,
              c.totalDuration AS courseTotalDuration, c.modules AS courseModules, c.tags AS courseTags,
              c.isPublished AS courseIsPublished, c.isFeatured AS courseIsFeatured, c.createdAt AS courseCreatedAt,
              c.updatedAt AS courseUpdatedAt
       FROM enrollments e
       JOIN courses c ON e.courseId = c.id
       WHERE e.userId = ?
       ORDER BY e.enrolledAt DESC`
    )
    .all(userId);

  return rows.map((row) => mapEnrollmentRow(row, true));
}

export function getEnrollmentByUserCourse(userId, courseId) {
  const row = db
    .prepare('SELECT * FROM enrollments WHERE userId = ? AND courseId = ?')
    .get(userId, courseId);
  return mapEnrollmentRow(row);
}

export function completeLesson(userId, courseId, lessonId) {
  const enrollment = db
    .prepare('SELECT * FROM enrollments WHERE userId = ? AND courseId = ?')
    .get(userId, courseId);
  if (!enrollment) return null;

  const course = getCourseById(courseId);
  if (!course) return null;

  const completedLessons = parseJson(enrollment.completedLessons);
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
  }

  const progress = course.totalLessons > 0 ? Math.min(100, Math.round((completedLessons.length / course.totalLessons) * 100)) : 100;
  const now = new Date().toISOString();

  db.prepare(
    'UPDATE enrollments SET completedLessons = ?, progress = ?, lastAccessedAt = ? WHERE id = ?'
  ).run(JSON.stringify(completedLessons), progress, now, enrollment.id);

  return getEnrollmentByUserCourse(userId, courseId);
}

export function getReviewsByCourse(courseId) {
  const rows = db
    .prepare('SELECT * FROM reviews WHERE courseId = ? ORDER BY createdAt DESC')
    .all(courseId);
  return rows.map(mapReviewRow);
}

export function createReview(userId, courseId, rating, comment) {
  const course = getCourseById(courseId);
  if (!course) return null;

  const id = `rev-${randomUUID()}`;
  const now = new Date().toISOString();
  db.prepare(
    'INSERT INTO reviews (id, courseId, userId, rating, comment, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(id, courseId, userId, rating, comment, now);

  const stats = db
    .prepare('SELECT COUNT(*) AS totalReviews, AVG(rating) AS averageRating FROM reviews WHERE courseId = ?')
    .get(courseId);

  if (stats) {
    db.prepare('UPDATE courses SET totalReviews = ?, rating = ? WHERE id = ?')
      .run(stats.totalReviews, Math.round((stats.averageRating ?? 0) * 10) / 10, courseId);
  }

  return mapReviewRow({ id, courseId, userId, rating, comment, createdAt: now });
}
