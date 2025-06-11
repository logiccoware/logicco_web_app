import type { IEntitySelectDataList } from "@/components/ui/EntityDataList/types";
import type { TPayeeEntity } from "@/features/payees/api/schema";

export function toPayeeEntitySelectList(
  items: TPayeeEntity[]
): IEntitySelectDataList<TPayeeEntity>[] {
  return items.map((item) => ({
    id: item.id,
    primaryText: item.name,
    data: item,
  }));
}
