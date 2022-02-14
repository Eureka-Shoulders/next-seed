import { Ability, RawRuleOf } from '@casl/ability';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';
import httpService from 'services/httpService';
import { Actions, AppAbility, Subjects } from 'types';

type WithSSRAuthOptions = {
  can: {
    action: Actions;
    subject: Subjects;
  }[];
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { user_token } = parseCookies(ctx);

    if (!user_token && !ctx.req.rawHeaders.some((i) => i.includes('/login'))) {
      return {
        redirect: {
          destination: `/login?redirect=${encodeURIComponent(
            ctx.req.url || '/'
          )}`,
          permanent: false,
        },
      };
    }

    if (options) {
      const { can } = options;

      try {
        const abilitiesResponse = await httpService.client.get<
          RawRuleOf<AppAbility>[]
        >('/auth/abilities', {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        });

        if (abilitiesResponse.data) {
          const userAbilities = new Ability(
            abilitiesResponse.data
          ) as AppAbility;

          can.forEach(({ action, subject }) => {
            if (userAbilities.cannot(action, subject))
              throw new Error('Not Authorized');
          });
        }
      } catch (error) {
        return {
          redirect: {
            destination: '/no-permissions',
            permanent: false,
          },
        };
      }
    }

    return await fn(ctx);
  };
}
