import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./_styles.scss";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { showService } from "../../services/showService";
import { userService } from "../../services/userService";
import { hasWatchedEpisode } from "../../utilities/functions";
import { ShowFull, Episode } from "../../interfaces/shows";
import { User } from "../../interfaces/user";

interface Props {
  isAuthenticated: boolean;
}
export default function ShowPage({ isAuthenticated }: Props) {
  let navigate = useNavigate();
  const { show } = useParams();
  console.log("param show", show);
  const [showToDisplay, setShowToDisplay] = useState<ShowFull | null>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const stringifiedUser = localStorage.getItem("user");
    if (stringifiedUser) {
      const user = JSON.parse(stringifiedUser);
      setUser(user);
    }

    const loadShow = async () => {
      try {
        const response = await showService.fetchSingle(show);
        setShowToDisplay(response.tvShow);
      } catch (error) {
        console.log("error", error);
      }
    };
    loadShow();
  }, []);

  const addOrUpdateShow = async (episode: Episode) => {
    setLoading(true);

    if (showToDisplay) {
      const showName = showToDisplay.name;
      const episodeDetails = episode;

      const requestData = {
        email: user?.email,
        showName: showName,
        episodeDetails: episodeDetails,
      };
      const requestBody = JSON.stringify(requestData);

      try {
        const response = await userService.updateShows(requestBody);
        setUser(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  console.log("showToDisplay", showToDisplay);

  return (
    <div className="show-item-wrapper">
      <div className="viewer-wrapper">
        <div className="viewer">
          <AiFillPlayCircle id="play-button" />
        </div>
        <div className="heading-loader-wrapper">
          <h3 className="episodes-heading">Episodes</h3>
          {loading && <AiOutlineLoading3Quarters className="spin" />}
        </div>

        <div className="episodes-wrapper">
          {showToDisplay?.episodes
            ?.filter((episode) => episode.season === 1)
            .map((episode) => (
              <div
                className="episode"
                key={episode.name}
                onClick={() => addOrUpdateShow(episode)}
              >
                <div className="watched-icon-wrapper">
                  {user && hasWatchedEpisode(user, episode, showToDisplay) ? (
                    <div className="watched-icon">Watched</div>
                  ) : (
                    <div className="watched-placeholder"> </div>
                  )}
                </div>
                <div className="episode-name">{episode.name}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="details-wrapper">
        {showToDisplay && (
          <>
            <img
              className="show-item-image"
              src={showToDisplay.image_path}
            ></img>
            <div className="details-item-large">{showToDisplay.name}</div>
            <div className="details-item-small">
              {showToDisplay.description}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
