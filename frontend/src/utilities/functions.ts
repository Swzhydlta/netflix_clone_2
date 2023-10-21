import { User } from "../interfaces/user";
import { Episode, ShowFull } from "../interfaces/shows";
export const formatShowName = (urlShowName: string) => {
  const decodedName = decodeURIComponent(urlShowName);

  const formattedName = decodedName.replace(/\s+/g, "-").toLowerCase();

  return formattedName;
};

export function hasWatchedEpisode(
  user: User,
  episode: Episode,
  showToDisplay: ShowFull
) {
  if (user.shows) {
    for (const show of user.shows) {
      if (show.name === showToDisplay.name) {
        return show.episodes.some(
          (userEpisode) =>
            userEpisode.season === episode.season &&
            userEpisode.episode === episode.episode &&
            userEpisode.name === episode.name &&
            userEpisode.air_date === episode.air_date
        );
      }
    }
  }
  return false;
}
