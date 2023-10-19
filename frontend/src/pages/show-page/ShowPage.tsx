import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./_styless.scss";

export default function ShowPage() {
  const { show } = useParams();
  console.log("param show", show);
  const [showToDisplay, setShowToDisplay] = useState({});

  useEffect(() => {
    const loadShow = async () => {
      const url = `https://www.episodate.com/api/show-details?q=${show}`;
      const headers = {
        Accept: "*/*",
      };

      const options = {
        method: "GET",
        headers,
      };
      try {
        const show = await fetch(url, options);
        const jsonShows = await show.json();
        setShowToDisplay(jsonShows);
        // setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    loadShow();
  }, []);
  console.log("showToDisplay", showToDisplay);
  return (
    <div className="show-item-wrapper">
      <div className="viewer-wrapper">test</div>
      <div className="details-wrapper">
        {showToDisplay.tvShow && <div>{showToDisplay.tvShow.name}</div>}
      </div>
    </div>
  );
}
