import { useEffect, useState } from "react";
import "./_styles.scss";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [shows, setShows] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadShows = async () => {
      const url = " https://www.episodate.com/api/most-popular?page=1";
      const headers = {
        Accept: "*/*",
      };

      const options = {
        method: "GET",
        headers,
      };
      try {
        const shows = await fetch(url, options);
        const jsonShows = await shows.json();
        setShows(jsonShows);
        setLoading(false);
        console.log("json", json);
      } catch (error) {
        console.log("error", error);
      }
    };
    loadShows();
  }, []);

  const getNewPage = async (page: number) => {
    setLoading(true);
    const url = `https://www.episodate.com/api/most-popular?page=${page}`;
    const headers = {
      Accept: "*/*",
    };

    const options = {
      method: "GET",
      headers,
    };
    try {
      const shows = await fetch(url, options);
      const jsonShows = await shows.json();
      setShows(jsonShows);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleNavigate = (showName: string) => {
    navigate(`/shows/${showName}`);
  };
  return (
    <div className="all-shows-wrapper">
      {!loading ? (
        shows.tv_shows &&
        shows.tv_shows.map((show) => (
          <div
            className="show-wrapper"
            key={show.id}
            onClick={() => handleNavigate(show.name)}
          >
            <div className="image-container">
              <img
                className="show-image"
                src={show.image_thumbnail_path}
                alt={show.name}
              />
            </div>
            <div className="show-details">{show.name}</div>
          </div>
        ))
      ) : (
        <div>loading</div>
      )}

      <div className="pageflip-wrapper">
        {shows.page > 1 ? (
          <div
            className="pageflip-button"
            onClick={() => getNewPage(shows.page - 1)}
          >
            Previous
          </div>
        ) : (
          <div className="pageflip-button">Previous</div>
        )}
        {shows.page < shows.pages ? (
          <div
            className="pageflip-button"
            onClick={() => getNewPage(shows.page + 1)}
          >
            {" "}
            Next
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
