import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SongCard,
  Error,
  Loader,
} from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const { data, error, isFetching } =
    useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_uTcDfCYXMSNwWHitBRgBLNRTqGCLU"
      )
      .then((res) =>
        setCountry(res?.data?.location?.country)
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading)
    return (
      <Loader title="Loading Songs Around You" />
    );

  if (error && country) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mb-10 mt-4 text-left">
        Around You{" "}
        <span className="font-black">
          {country}
        </span>
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

export default AroundYou;
