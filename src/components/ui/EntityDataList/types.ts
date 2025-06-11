export interface IEntityDataList<T> {
  id: string;
  primaryText: string;
  secondaryText?: string;
  rightIcon?: React.ReactNode;
  data: T;
}

export interface IEntitySelectDataList<T> extends IEntityDataList<T> {}
