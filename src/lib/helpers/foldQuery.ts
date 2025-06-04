import type { ReactElement } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

type Props<TData, TError> = {
  errorComponent: (error: TError) => ReactElement | null;
  loadingComponent: () => ReactElement | null;
  successComponent: (data: TData) => ReactElement | null;
};

export function foldQuery<TData, TError>(
  { isLoading, error, data }: UseQueryResult<TData, TError>,
  { errorComponent, loadingComponent, successComponent }: Props<TData, TError>
) {
  if (error) {
    return errorComponent(error);
  }
  if (isLoading) {
    return loadingComponent();
  }
  if (data) {
    return successComponent(data);
  }
  return null;
}
