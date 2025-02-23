import { CustomAreaChart } from "./_components/charts/area-chart";

export default async function Page() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Dashboard</h2>

        <CustomAreaChart />
      </main>
    </>
  );
}
