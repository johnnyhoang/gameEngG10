const { Client } = require('pg');

const dbUrl = "postgresql://postgres.czngbleeeiljsrpbaksg:B1gh13u1977dtnt@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";
const subject = 'cs_robot_programming';
const grade_tier = 13;

const lessons = [];
const questions = [];

// Data will be pushed here
module.exports = { lessons, questions };
