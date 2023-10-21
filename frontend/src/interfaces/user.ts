import { Episode } from "./shows";

interface UserShow {
  name: string;
  episodes: Episode[];
}

export interface User {
  email: string;
  shows: UserShow[];
}
