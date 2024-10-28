import { Card, Skeleton } from "@nextui-org/react";

export function CardShimmer() {
  return (
    <main className="flex flex-1 flex-col gap-1 p-4 lg:gap-6 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
      bg-clip-text text-lg font-bold text-transparent"
        >
          Amigo Users
        </h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <Card className="setfile" radius="lg">
          <Skeleton className="rounded-lg h-full bg-[#c2c2c2]">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-12 h-12 rounded-full absolute top-2 left-2">
              <div className="w-12 h-12 rounded-full bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[60px] rounded-lg absolute top-2 left-16">
              <div className="w-[60px] h-2 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[70px] rounded-lg absolute top-6 left-16">
              <div className="h-2 w-[70px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-[22px] rounded-lg absolute top-2 right-4">
              <div className="w-full h-[22px] rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[120px] rounded-lg absolute bottom-8 left-2 z-10">
              <div className="w-[60px] h-2 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[120px] rounded-lg absolute bottom-4 left-2 z-10">
              <div className="h-2 w-[70px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-[22px] rounded-lg absolute bottom-4 right-4 z-10">
              <div className="w-full h-[22px] rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full absolute bottom-0 bg-[#646464]">
              <div className="h-14 w-full bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>
    </main>
  );
}

export function ProfileShimmer() {
  return (
    <main className="flex flex-col gap-1 p-4 lg:gap-6 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
        bg-clip-text text-lg font-bold text-transparent"
        >
          Profile
        </h1>
      </div>
      <div
        className="flex flex-1 items-center sm:items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <Card className="profilecard" radius="lg">
          <Skeleton className="rounded-lg h-full bg-[#c2c2c2]">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-24 h-24 rounded-full absolute top-3 left-[130px] sm:left-[180px]">
              <div className="w-18 h-18 rounded-full bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg absolute top-28">
              <div className="w-full h-[1px] rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg absolute top-[260px]">
              <div className="w-full h-[1px] rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg absolute top-[340px]">
              <div className="w-full h-[1px] rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[90%] rounded-lg absolute top-[365px] left-5">
              <div className="w-full h-20 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full absolute bottom-0 ">
              <div className="h-9 w-full bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>
    </main>
  );
}

export function MyConnectionShimmer() {
  const cardsArray = new Array(9).fill(0);
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
        bg-clip-text text-lg font-bold text-transparent"
        >
          My Connection
        </h1>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:px-4 sm:py-5"
        x-chunk="dashboard-02-chunk-1"
      >
        {cardsArray.map((_, index) => (
          <Card key={index} className="w-auto h-[160px]" radius="lg">
            <Skeleton className="rounded-lg h-full bg-[#f7f6f6]">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-12 h-12 rounded-full absolute top-3 left-2">
                <div className="w-12 h-12 rounded-full bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[42px] rounded-lg absolute top-4 left-16">
                <div className="w-full h-[4px] rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[52px] rounded-lg absolute top-6 left-16">
                <div className="w-full h-[4px] rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[72px] rounded-lg absolute top-2 right-4">
                <div className="w-full h-[22px] rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function PendingConnectionShimmer() {
  const cardsArray = new Array(9).fill(0);
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
        bg-clip-text text-lg font-bold text-transparent"
        >
          Pending Connection
        </h1>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:px-4 sm:py-5"
        x-chunk="dashboard-02-chunk-1"
      >
        {cardsArray.map((_, index) => (
          <Card key={index} className="w-auto h-[160px]" radius="lg">
            <Skeleton className="rounded-lg h-full bg-[#f7f6f6]">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-12 h-12 rounded-full absolute top-3 left-2">
                <div className="w-12 h-12 rounded-full bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[42px] rounded-lg absolute top-4 left-16">
                <div className="w-full h-[4px] rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[52px] rounded-lg absolute top-6 left-16">
                <div className="w-full h-[4px] rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[22px] rounded-lg absolute top-2 right-4">
                <div className="w-full h-[22px] rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[22px] rounded-lg absolute top-2 right-14">
                <div className="w-full h-[22px] rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
