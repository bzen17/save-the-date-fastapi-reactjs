const data = localStorage.getItem("tokenStore")
  ? JSON.parse(localStorage.getItem("tokenStore"))
  : null;
const HEADER = data
  ? {
      headers: { Authorization: `${data.token_type} ${data.access_token}` },
    }
  : null;

export default HEADER;
