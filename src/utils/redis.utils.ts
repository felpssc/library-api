import { promisify } from 'util';
import { redis } from '../../redis-config';

const getRedis = (value: string) => {
  const syncRedisGet = promisify(redis.get).bind(redis);

  return syncRedisGet(value);
};

const setRedis = (key: string, value: string) => {
  const syncRedisSet = promisify(redis.set).bind(redis);

  return syncRedisSet(key, value);
};

export { getRedis, setRedis };
