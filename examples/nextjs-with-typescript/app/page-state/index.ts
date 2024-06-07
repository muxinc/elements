import { GetServerSideProps } from 'next';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useRouter } from 'next/router';
import { Dispatch, Reducer, useEffect, useReducer } from 'react';

const DEFAULT_INITIAL_STATE = Object.freeze({}) as Readonly<Record<string, any>>;

export const defaultToInitialState = <T extends Record<string, any> = Record<string, any>>(
  query: NextParsedUrlQuery,
  ..._additionalArgs: any[]
  //   defaultInitialState = DEFAULT_INITIAL_STATE
) => {
  const queryState = Object.fromEntries(Object.entries(query).map(([k, v]) => [k, JSON.parse(v as string)]));
  const initialState = {
    ...DEFAULT_INITIAL_STATE,
    ...queryState,
  };
  return initialState as Partial<T>;
};

export const ActionType = {
  UPDATE: 'UPDATE',
} as const;

type ActionType = typeof ActionType;

export const updateProps = <T extends any = any>(value: Partial<T>) => {
  return {
    type: ActionType.UPDATE,
    value,
  };
};

type ActionTypes = ActionType[keyof ActionType];

type Action = { type: ActionTypes; value: any };

export const reducer = <T extends Record<string, any> = Record<string, any>>(
  state: Partial<T>,
  action: Action
): Partial<T> => {
  const { type, value } = action;
  switch (type) {
    case ActionType.UPDATE: {
      return {
        ...state,
        ...value,
      };
    }
    default: {
      return state;
    }
  }
};

export const usePageStateReducer = <T extends Record<string, any> = Record<string, any>>(toInitialState = defaultToInitialState, additionalInitialStateArgs = []) => {
  const router = useRouter();
  const initialState = toInitialState(router.query, ...additionalInitialStateArgs) as Partial<T>;
  const [state, dispatch] = useReducer<Reducer<Partial<T>, Action>>(reducer, initialState);
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(updateProps(toInitialState(router.query, ...additionalInitialStateArgs) as Partial<T>));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.isReady]);
  const genericOnChange = (obj) => dispatch(updateProps(obj));
  return [state, dispatch, genericOnChange] as [Partial<T>, Dispatch<Action>, typeof genericOnChange];
};

export const getUrl = ({ req, resolvedUrl }) => {
    const { headers } = req;
    const refererUrl = headers.referer && new URL(headers.referer);
    const baseUrlHost = headers.host.toLowerCase();
    const refererHost = refererUrl?.host?.toLowerCase();

    if (refererHost === baseUrlHost && headers['sec-fetch-site'] === 'same-origin') {
      return new URL(refererUrl?.origin ? refererUrl.origin + resolvedUrl : './');
    }

    const startsLocal =
      baseUrlHost.startsWith('localhost') || baseUrlHost.startsWith('127.') || baseUrlHost.startsWith('192.');
    const protocol = startsLocal ? 'http:' : 'https:';
    return new URL(`${protocol}//${baseUrlHost}${resolvedUrl}`);
  };

  export type LocationProps = { location?: Pick<Location, 'origin' | 'pathname'> };

  export const getLocationServerSideProps: GetServerSideProps<LocationProps> = async (context) => {
    const { origin, pathname }: Pick<Location, 'origin' | 'pathname'> = getUrl(context);
    const location = { origin, pathname };
    return { props: { location } };
  };