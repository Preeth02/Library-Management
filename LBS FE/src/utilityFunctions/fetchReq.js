const fetchReq = async ({
  body = null,
  link,
  method = "GET",
  headers = {},
}) => {
  try {
    // console.log(body, link, method, headers);
    const options = {
      method,
      credentials: "include",
      body,
      headers,
    };
    const req = await fetch(link, options);
    if (req) {
      const data = await req.json();
      if (data) {
        return { data: data?.data, error: null };
      }
    }
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export default fetchReq;
