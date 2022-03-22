const TYPES = {
  /**
   * Stores
   */
  ThemeStore: Symbol('ThemeStore'),
  UserStore: Symbol('UserStore'),

  /**
   * Services
   */
  ApiService: Symbol('ApiService'),
  LoggerService: Symbol('LoggerService'),
  AuthService: Symbol('AuthService'),
  Locale: Symbol('Locale'),
  TranslationService: Symbol('TranslationService'),
  NotificationService: Symbol('NotificationService'),

  /**
   * Repositories
   */
  UsersRepository: Symbol('UsersRepository'),
  PeopleRepository: Symbol('PeopleRepository'),
};

export default TYPES;
