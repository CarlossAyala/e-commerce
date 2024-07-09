/**
 * Environment variables
 * @typedef {Object} Env
 * @property {string} node_env - Node environment
 * @property {number} port - Port number
 * @property {number} salt_rounds - Number of rounds for password hashing
 * @property {Object} db - Database configuration
 * @property {string} db.database - Database name
 * @property {string} db.user - Database user
 * @property {string} db.password - Database password
 * @property {string} db.host - Database host
 * @property {number} db.port - Database port
 * @property {Object} jwt - JWT configuration
 * @property {Object} jwt.access_token - Access token configuration
 * @property {string} jwt.access_token.secret - Access token secret
 * @property {string} jwt.access_token.expire - Access token expiration time
 * @property {Object} jwt.refresh_token - Refresh token configuration
 * @property {string} jwt.refresh_token.secret - Refresh token secret
 * @property {string} jwt.refresh_token.expire - Refresh token expiration time
 * @property {Object} admin - Admin configuration
 * @property {string} admin.name - Admin name
 * @property {string} admin.lastName - Admin last name
 * @property {string} admin.email - Admin email
 * @property {string} admin.password - Admin password
 * @property {Object} seller - Seller configuration
 * @property {string} seller.password - Seller password
 * @property {Object} stripe - Stripe configuration
 * @property {string} stripe.sk_test - Stripe test secret key
 * @property {Object} cloudinary - Cloudinary configuration
 * @property {string} cloudinary.cloud_name - Cloudinary cloud name
 * @property {string} cloudinary.api_key - Cloudinary API key
 * @property {string} cloudinary.api_secret - Cloudinary API secret
 * @property {Object} resend - Resend configuration
 * @property {string} resend.api_key - Resend API key
 * @property {Object} redis - Redis configuration
 * @property {string} redis.host - Redis host
 * @property {number} redis.port - Redis port
 * @property {string} client_url - Client URL
 * @property {string} logger.level - Logger level
 */

module.exports = {};
