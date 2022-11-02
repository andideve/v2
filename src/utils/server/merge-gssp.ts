import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import merge from 'merge';

export default function mergeGSSP<P extends { [key: string]: any } = {}>(
  ...gssps: GetServerSideProps<Partial<P>>[]
): GetServerSideProps<P> {
  return async (ctx) => {
    let result = {} as GetServerSidePropsResult<P>;
    for (const fn of gssps) {
      if ('redirect' in result) break;
      result = merge.recursive(true, result, await fn(ctx));
    }

    return result;
  };
}
