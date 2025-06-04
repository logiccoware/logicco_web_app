import type { IEntityDataList } from "@/components/ui/EntityDataList/types";
import type { TPayeeEntity } from "@/features/payees/api/schema";

export function toPayeeDataList(
  items: TPayeeEntity[]
): IEntityDataList<TPayeeEntity>[] {
  return items.map((item) => ({
    id: item.id,
    primaryText: item.name,
    data: item,
  }));
}
