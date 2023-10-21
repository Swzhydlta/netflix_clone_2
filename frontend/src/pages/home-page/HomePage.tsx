import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./_styles.scss";
import { showService } from "../../services/showService";
import { Shows } from "../../interfaces/shows";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  isAuthenticated: boolean;
}

export default function HomePage({ isAuthenticated }: Props) {
  const [shows, setShows] = useState<Shows | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("user");

      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const shows = await showService.fetchByPage(1);
        setShows(shows);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  const getNewPage = async (page: number) => {
    setLoading(true);

    try {
      const shows = await showService.fetchByPage(page);
      setShows(shows);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleNavigate = (showName: string) => {
    navigate(`/shows/${showName}`);
  };
  console.log("error", error);
  return (
    <div className="all-shows-wrapper">
      {error && "There was an error loading the shows."}
      {!loading &&
        !error &&
        shows &&
        shows.tv_shows &&
        shows.tv_shows.map((show) => (
          <div
            className="show-wrapper"
            key={show.id}
            onClick={() => handleNavigate(show.permalink)}
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
        ))}
      {loading && <AiOutlineLoading3Quarters className="spin" />}

      <div className="pageflip-wrapper">
        {shows && !error && shows.page > 1 && (
          <div
            className="pageflip-button"
            onClick={() => getNewPage(shows.page - 1)}
          >
            Previous
          </div>
        )}
        {shows && !error && shows.page === 1 && (
          <div className="pageflip-button">Previous</div>
        )}
        {shows && !error && shows.page < shows.pages && (
          <div
            className="pageflip-button"
            onClick={() => getNewPage(shows.page + 1)}
          >
            Next
          </div>
        )}
      </div>
    </div>
  );
}
