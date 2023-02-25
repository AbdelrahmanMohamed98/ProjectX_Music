import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  SongCard,
  Error,
  Loader,
} from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );
  const { searchTerm } = useParams();
  const { data, error, isFetching } =
    useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits?.map(
    (song) => song.track
  );

  if (isFetching) {
    return (
      <Loader title="Loading Songs Top Charts" />
    );
  }

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mb-10 mt-4 text-left">
        Showing Results For{" "}
        <span className="font-black">
          {searchTerm}
        </span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
