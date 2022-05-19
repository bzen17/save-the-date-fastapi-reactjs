const data = localStorage.getItem("tokenStore")
  ? JSON.parse(localStorage.getItem("tokenStore"))
  : null;
const HEADER = data
  ? {
      headers: {
        Authorization: `${data.token_type} ${data.access_token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  : {
      headers: { "Access-Control-Allow-Origin": "*" },
    };

export default HEADER;
