import axios from "axios";

const BASEURL = "https://opentdb.com/api.php";

export default async function fetchData(data) {
  const response = await axios.get(`${BASEURL}`, {
    params: {
      amount: data.amount,
      category: data.category,
      difficulty: data.difficulty,
      type: data.type,
      encode: "url3986",
    },
  });

  return response.data.results;
}
