import { Button } from "@/components/ui/button";
import { Image } from "@nextui-org/react";

import { NoUser, NoConnectionimg, NoRequestimg, NoProfileFound } from "./Data";
import { Link } from "react-router-dom";

export function NoUserCard() {
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
        <div className="flex flex-col items-center gap-1 text-center">
          <Image src={NoUser} className="w-[280px] h-[220px] object-cover" />
          <h3 className="text-2xl font-bold tracking-tight font-[NetflixR]">
            No More User Available
          </h3>
          <p className="text-sm text-muted-foreground font-[NetflixL]">
            You’ve seen all the profiles for now. Check back later or expand
            your interests!
          </p>
          <p className="text-xs text-muted-foreground font-[NetflixL] w-[270px] mt-2">
            If You want to see Top 10 Amigo Couples, Freinds of this month then
            Click on below button
          </p>
          <Link>
            <Button className="mt-1 h-9 font-[NetflixL]">Amigo Members</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export function NoConnection() {
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 ml-3 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
    bg-clip-text text-lg font-bold text-transparent"
        >
          My Connection
        </h1>
      </div>
      <div
        className="flex flex-1 items-start sm:items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center my-auto">
          <Image
            src={NoConnectionimg}
            className="w-[280px] h-[220px] object-cover"
          />
          <h3 className="text-2xl font-bold tracking-tight font-[NetflixR]">
            You Have No Connection
          </h3>
          <p className="text-sm text-muted-foreground font-[NetflixL]">
            It looks like you haven't made any connections yet.
          </p>
          <p className="text-xs text-muted-foreground font-[NetflixL] w-[270px] mt-2">
            Start exploring profiles and send connection to users you'd like to
            connect with.
          </p>
          <Link to="/home">
            <Button className="mt-1 h-9 font-[NetflixL]">Explore Users</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export function NoRequest() {
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 ml-3 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
  bg-clip-text text-lg font-bold text-transparent"
        >
          Pending Connection
        </h1>
      </div>
      <div className="flex flex-1 items-start sm:items-center justify-center">
        <div className="flex flex-col items-center gap-1 text-center my-auto">
          <Image
            src={NoRequestimg}
            className="w-[280px] h-[220px] object-cover"
          />
          <h3 className="text-2xl font-bold tracking-tight font-[NetflixR]">
            No Pending Connection Yet
          </h3>
          <p className="text-sm text-muted-foreground font-[NetflixL]">
            You don’t have any pending connection at the moment.
          </p>
          <p className="text-xs text-muted-foreground font-[NetflixL] w-[270px] mt-2">
            Browse through profiles and send a connection to users you connect
            with.
          </p>
          <Link to="/home">
            <Button className="mt-1 h-9 font-[NetflixL]">Explore Users</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export function NoProfile() {
  return (
    <main className="flex flex-1 flex-col gap-1 p-4 lg:gap-6 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[NetflixL] md:text-2xl md:pb-1 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
  bg-clip-text text-lg font-bold text-transparent"
        >
          No User
        </h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <Image
            src={NoProfileFound}
            className="w-[300px] h-[260px] object-cover"
          />
          <h3 className="text-2xl font-bold tracking-tight font-[NetflixR]">
            No User Profile Found.
          </h3>
          <p className="text-sm text-muted-foreground font-[NetflixL]">
            Sorry, we couldn't locate the user profile you're searching for.
            Please check the ID and try again.
          </p>
          <p className="text-xs text-muted-foreground font-[NetflixL] w-[270px] mt-2">
            Go Back and make connection
          </p>
          <Link to="/home">
            <Button className="mt-1 h-9 font-[NetflixL]">Amigo Users</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
