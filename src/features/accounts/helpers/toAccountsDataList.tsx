import type { IEntityDataList } from "@/components/ui/EntityDataList/types";
import type { TAccountEntity } from "@/features/accounts/schema";
import VerifiedIcon from '@mui/icons-material/Verified';

export function toAccountsDataList(
  items: TAccountEntity[],
  accountDefaultId?: string
): IEntityDataList<TAccountEntity>[] {
  return items.map((item) => ({
    id: item.id,
    primaryText: item.name,
    rightIcon: item.id === accountDefaultId ? <VerifiedIcon /> : null,
    data: item,
  }));
}
