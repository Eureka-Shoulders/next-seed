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
  Locale: Symbol('Locale'),
  TranslationService: Symbol('TranslationService'),

  /**
   * Repositories
   */
  UsersRepository: Symbol('UsersRepository'),
  PeopleRepository: Symbol('PeopleRepository'),
};

export default TYPES;
