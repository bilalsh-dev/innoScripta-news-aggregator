import axios from "axios";

const { VITE_APP_THE_GUARDIAN_API_KEY } = import.meta.env;
const GUARDIAN_BASE_URL = "https://content.guardianapis.com";
const GUARDIAN_API_KEY =
  VITE_APP_THE_GUARDIAN_API_KEY || "50887b5b-52a9-435f-b5e2-fd0a17568d18";

export const fetchGuardian = async (
  category?: string,
  query?: string,
  page: number = 1
) => {
  try {
    const params: Record<string, string | number> = {
      "api-key": GUARDIAN_API_KEY,
      page,
      "show-fields": "bodyText",
      "show-tags": "keywords",
      "show-blocks": "main",
    };

    if (category) params.section = category;
    if (query) params.q = query;

    const response = await axios.get(`${GUARDIAN_BASE_URL}/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Guardian API:", error);
    throw error;
  }
};
