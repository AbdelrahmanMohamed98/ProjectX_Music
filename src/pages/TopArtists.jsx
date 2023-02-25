import axios from "axios";
import {
  Error,
  Loader,
  ArtistCard,
} from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { data, error, isFetching } =
    useGetTopChartsQuery();

  if (isFetching)
    return (
      <Loader title="Loading Songs Top Charts" />
    );

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mb-10 mt-4 text-left">
        Top Artists{" "}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((track) => (
          <ArtistCard
            key={track.key}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
