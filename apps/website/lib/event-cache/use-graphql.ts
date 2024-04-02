import { env } from "@/env.mjs"
import { type TypedDocumentNode } from "@graphql-typed-document-node/core"
import {
  useQuery,
  type UndefinedInitialDataOptions,
  type UseQueryResult,
} from "@tanstack/react-query"
import request from "graphql-request"

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  options: UndefinedInitialDataOptions<TResult, Error, TResult, any[]>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery({
    ...options,
    queryKey: [(document.definitions[0] as any).name.value, variables],
    queryFn: async ({ queryKey }) =>
      request(
        env.NEXT_PUBLIC_API_EVENT_CACHE,
        document,
        queryKey[1] ? queryKey[1] : undefined
      ),
  })
}
