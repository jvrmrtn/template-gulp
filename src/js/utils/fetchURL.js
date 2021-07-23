export const fetchUrl = async (url) => {
  const request = await fetch(url);
  const data = await request.json();
  console.log(data);
};
