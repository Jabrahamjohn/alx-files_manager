class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }

  set(key, value) {
    this.client.set(key, value);
  }

  get(key, callback) {
    this.client.get(key, callback);
  }
}