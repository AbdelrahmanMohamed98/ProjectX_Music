import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useParams } from "react-router-dom";
import {
  DetailsHeader,
  Error,
  Loader,
  RelatedSongs,
} from "../components";
import {
  playPause,
  setActiveSong,
} from "../redux/features/playerSlice";
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
  } = useGetSongDetailsQuery({ songid });
  const {
    data,
    error,
    isFetching: isFetchingRelatedSongs,
  } = useGetRelatedSongsQuery({ songid });

  if (
    isFetchingSongDetails ||
    isFetchingRelatedSongs
  ) {
    return (
      <Loader title="Searching song Details" />
    );
  }

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId=""
        songData={songData}
      />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
        </h2>
        <div className="mt-5">
          {songData?.sections[1].type ===
          "LYRICS" ? (
            songData?.sections[1].text.map(
              (line, i) => (
                <p className="text-gray-300 my-1 text-base ">
                  {line}
                </p>
              )
            )
          ) : (
            <p className="text-gray-300 text-base my-1">
              Sorry No lyrics Found
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
