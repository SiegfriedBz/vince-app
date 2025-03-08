import type { SearchParams } from "nuqs/server";
import { searchParamsCache } from "./search-params";
import { SelectPcd } from "./_components/select-pcd";
import { GetCompanyPcds } from "./_api/get-company-pcds";
import { GetPcdProbes } from "./_api/get-pcd-probes";
import { SelectProbe } from "./_components/select-probe";
import type { CustomLineChartDataT } from "./types";
import { CustomLineChart } from "@/components/charts/line-chart";
import { GetSensorsData, type GetSensorsDataT } from "./_api/get-sensors-data ";

type Props = {
  searchParams: Promise<SearchParams>;
};

// TODO FIX
const COMPANY_ID = "336ae36a-da41-4295-bb35-63aeb718ab4c";

export default async function Page(props: Props) {
  const filters = await searchParamsCache.parse(props.searchParams);

  const { pcd_id, probe_id } = filters;

  const pcdsData = await GetCompanyPcds({ companyId: COMPANY_ID });
  const probesData = await GetPcdProbes({ pcdId: pcd_id });

  const sensorsData = await GetSensorsData({ probeId: probe_id });
  const formatedSensorsData = getFormatedSensorsData(sensorsData);

  return (
    <>
      <main className="flex-1 w-full flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Dashboard</h2>

        <div className="flex flex-wrap gap-8">
          <div key="pcd_id">
            <SelectPcd selectedPcdId={pcd_id} pcdsData={pcdsData} />
          </div>
          <div key="probe_id">
            <SelectProbe selectedProbeId={pcd_id} probesData={probesData} />
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-8 items-center mx-auto sm:justify-start">
          {formatedSensorsData?.map((sensorData, idx) => {
            return (
              <CustomLineChart
                key={`${idx}-${sensorData.sensor.measuredParameter}`}
                data={sensorData}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

const getFormatedSensorsData = (
  sensorsData: GetSensorsDataT
): CustomLineChartDataT[] => {
  return sensorsData?.map((d) => {
    return {
      pcd: {
        designation: d.probe.pcd.designation,
      },

      probe: {
        designation: d.probe.designation,
      },

      sensor: {
        designation: d.designation,
        unit: d.unit,
        measuredParameter: d.mesured_parameter,
        readings: d.readings.map((r) => {
          return {
            id: r.id,
            value: r.validated_value,
            quality: r.reading_quality,
            timestamp: r.reading_timestamp,
          };
        }),
      },
    };
  });
};
