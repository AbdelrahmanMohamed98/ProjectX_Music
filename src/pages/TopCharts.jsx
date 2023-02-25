import axios from "axios";
import { useSelector } from "react-redux";
import {
  SongCard,
  Error,
  Loader,
} from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

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
        Discover Top Charts{" "}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
