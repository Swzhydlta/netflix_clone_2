import { User } from "../interfaces/user";

interface UserService {
  updateShows: (data: string) => Promise<User>;
  login: (data: string) => Promise<User>;
  //   fetchSingle: (permalink: string) => Promise<ShowWrapper>;
}

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

export const userService: UserService = {
  async updateShows(data) {
    const options = {
      method: "POST",
      headers,
      body: data,
    };
    const response = await fetch(
      "https://pjditaizu4.execute-api.us-east-1.amazonaws.com/dev/users/update-shows",
      options
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  },

  async login(data) {
    const options = {
      method: "POST",
      headers,
      body: data,
    };
    const response = await fetch(
      "https://pjditaizu4.execute-api.us-east-1.amazonaws.com/dev/users/get-user",
      options
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  },
};
