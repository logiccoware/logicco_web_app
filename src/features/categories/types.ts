export interface FlatCategory {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
  user_id: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ISelectedCategory {
  id: string;
  name: string;
  parent?: {
    id: string;
    name: string;
  };
}

export interface ICategoryCreatePayload {
  name: string;
}

export interface ICategoryUpdatePayload {
  name: string;
}
