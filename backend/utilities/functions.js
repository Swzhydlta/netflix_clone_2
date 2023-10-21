function addEpisodeToUser(user, episodeDetails, showName) {
  if (!user.shows) {
    user.shows = [];
  }
  let show = user.shows.find((show) => show.name === showName);

  if (!show) {
    show = {
      name: showName,
      episodes: [episodeDetails],
    };
    user.shows.push(show);
  }

  const existingEpisode = show.episodes.find(
    (episode) =>
      episode.season === episodeDetails.season &&
      episode.episode === episodeDetails.episode &&
      episode.name === episodeDetails.name &&
      episode.air_date === episodeDetails.air_date
  );

  if (!existingEpisode) {
    show.episodes.push(episodeDetails);
  }
  return user;
}
module.exports = { addEpisodeToUser };
