import { Ability, RawRuleOf } from '@casl/ability';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { AppAbility, User } from 'types';

export interface UserStoreType {
  user: User | null;
  setUser(user: User | null): void;

  isRefreshingToken: boolean;
  setRefreshingToken(refreshingToken: boolean): void;

  rawAbilities: RawRuleOf<AppAbility>[] | null;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]): void;

  get abilities(): AppAbility | null;
  get isLogged(): boolean;
}

@injectable()
class UserStore implements UserStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  isRefreshingToken = false;
  setRefreshingToken(value: boolean) {
    this.isRefreshingToken = value;
  }

  user: User | null = null;
  setUser(user: User | null) {
    this.user = user;
  }

  rawAbilities: RawRuleOf<AppAbility>[] | null = null;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]) {
    this.rawAbilities = rawAbilities;
  }

  get abilities() {
    if (this.rawAbilities) {
      return new Ability(this.rawAbilities) as AppAbility;
    } else {
      return null;
    }
  }

  get isLogged() {
    return !!this.user && this.abilities !== null;
  }
}

export default UserStore;
