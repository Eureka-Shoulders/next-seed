export interface Actions {
  search: string;
  goBack: string;
  login: string;
  register: string;
  recover: string;
  createAccount: string;
  recoverPassword: string;
  confirmPassword: string;
  changePassword: string;
  add: string;
  edit: string;
  delete: string;
  cancel: string;
  save: string;
  logout: string;
  change: string;
  changeProfile: string;
  changeTheme: string;
  filter: string;
  hide: string;
  hideAll: string;
  showAll: string;
  showColumns: string;
  searchColumn: string;
  refresh: string;
  filters: {
    add: string;
    submit: string;
    undoSort: string;
    clearAll: string;
  };
}
