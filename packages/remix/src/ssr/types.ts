import type { AuthObject, Organization, Session, User } from '@clerk/backend';
import type { ClerkOptions } from '@clerk/types/src';
import type { DataFunctionArgs, LoaderFunction } from '@remix-run/server-runtime';

export type GetAuthReturn = Promise<AuthObject>;

export type RootAuthLoaderOptionsWithExperimental = RootAuthLoaderOptions & {
  /**
   * @experimental
   */
  isSatellite?: ClerkOptions['isSatellite'];
  /**
   * @experimental
   */
  domain?: string;
  /**
   * @experimental
   */
  proxyUrl?: string;
};

export type RootAuthLoaderOptions = {
  /**
   * @deprecated Use `publishableKey` instead.
   */
  frontendApi?: string;
  publishableKey?: string;
  jwtKey?: string;
  /**
   * @deprecated Use `secretKey` instead.
   */
  apiKey?: string;
  secretKey?: string;
  loadUser?: boolean;
  loadSession?: boolean;
  loadOrganization?: boolean;
  authorizedParties?: [];
};

export type RootAuthLoaderCallback<Options extends RootAuthLoaderOptions> = (
  args: LoaderFunctionArgsWithAuth<Options>,
) => RootAuthLoaderCallbackReturn;

export type RootAuthLoaderCallbackReturn =
  | Promise<Response>
  | Response
  | Promise<Record<string, unknown>>
  | Record<string, unknown>;

export type LoaderFunctionArgs = DataFunctionArgs;
export type LoaderFunctionReturn = ReturnType<LoaderFunction>;

export type LoaderFunctionArgsWithAuth<Options extends RootAuthLoaderOptions = any> = LoaderFunctionArgs & {
  request: RequestWithAuth<Options>;
};

export type RequestWithAuth<Options extends RootAuthLoaderOptions = any> = LoaderFunctionArgs['request'] & {
  auth: Omit<AuthObject, 'session' | 'user' | 'organization'>;
} & (Options extends { loadSession: true } ? { session: Session | null } : {}) &
  (Options extends { loadUser: true } ? { user: User | null } : {}) &
  (Options extends { loadOrganization: true } ? { organization: Organization | null } : {});
