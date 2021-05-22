import { env } from 'process';

export class ApplicationConfig {
    public static readonly PORT = env.PORT;
    public static readonly ASSETS_PATH = env.ASSETS_PATH;
    public static readonly VIEWS_PATH = env.VIEWS_PATH;
    public static readonly APP_PREFIX = env.APP_PREFIX;
    public static readonly SESSION_SECRET_KEY = env.SESSION_SECRET_KEY;
    public static readonly SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME;
    public static readonly GOOGLE_NEWS_URL = env.GOOGLE_NEWS_URL;
    public static readonly GOOGLE_NEWS_API_KEY = env.GOOGLE_NEWS_API_KEY;
}
