import { SelectItem } from "@/components/ui/select";
import { GetCompanyPcds } from "../_api/get-company-pcds";
import { searchParamsCache, type searchParamsParser } from "../search-params";

export type OptionT = {
  value: string;
  label: string;
};

type Props = {
  queryParam: keyof typeof searchParamsParser;
};

export const SelectPcdContentWrapper = async (props: Props) => {
  const { queryParam } = props;

  // 1. Get default value from params cache
  const pcdId = searchParamsCache?.get(queryParam);

  const pcdsData = await GetCompanyPcds({
    companyId: "336ae36a-da41-4295-bb35-63aeb718ab4c",
  });

  const options: OptionT[] = pcdsData.map((pcd) => {
    return {
      value: pcd.id,
      label: pcd.designation,
    };
  });

  const defaultLabel = options.find((option) => option.value === pcdId)?.label;

  console.log("======> defaultLabel", defaultLabel);

  return (
    <div className="w-full bg-background">
      {options?.map((option) => {
        const { value, label } = option;
        return (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        );
      })}
    </div>
  );
};
