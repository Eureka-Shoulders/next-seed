const TYPES = {
  /**
   * Stores
   */
  ThemeStore: Symbol('ThemeStore'),
  UserStore: Symbol('UserStore'),

  /**
   * Services
   */
  HydrationData: Symbol('HydrationData'),
  ApiService: Symbol('ApiService'),
  LoggerService: Symbol('LoggerService'),
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
