import {promisify} from 'util';
import { createClient } from 'redis';


class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.log('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      console.log('Redis client connected');
      this.isClientConnected = true;
    });
  }
  
  /**
   * checks if this client's connection is still active
   * @returns {boolean} true if the client is connected, false otherwise
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a key from the Redis instance
   * @param {string} key the key to retrieve
   * @returns {String | object} the value of the key
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * stores a key-value pair in the Redis instance with an expiration time
   * @param {string} key the key to store
   * @param {string | Number | boolean} value the value to store
   * @param {Number} duration expiration time in seconds
   * @returns {promise<void>} a promise that resolves when the operation is complete
   */
  async set (key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * removes a key from the Redis instance
   * @param {string} key the key to remove
   * @returns {promise<void>} a promise that resolves when the operation is complete
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;