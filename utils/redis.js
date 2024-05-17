import {promisify} from 'util';
import { createClient } from 'redis';


class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.log('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    }
    
  }

  set(key, value) {
    this.client.set(key, value);
  }

  get(key, callback) {
    this.client.get(key, callback);
  }
}