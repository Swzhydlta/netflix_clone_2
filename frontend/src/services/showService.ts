import { Shows, ShowWrapper } from "../interfaces/shows";

interface ShowService {
  fetchByPage: (page: number) => Promise<Shows>;
  fetchSingle: (permalink: string) => Promise<ShowWrapper>;
}

const headers = {
  Accept: "*/*",
};

const options = {
  method: "GET",
  headers,
};

export const showService: ShowService = {
  async fetchByPage(page) {
    const response = await fetch(
      `https://www.episodate.com/api/most-popular?page=${page}`,
      options
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  },
  async fetchSingle(permalink) {
    const response = await fetch(
      `https://www.episodate.com/api/show-details?q=${permalink}`,
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
