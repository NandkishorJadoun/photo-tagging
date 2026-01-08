export const imageLoader = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/game`);

  const { data } = await res.json();

  return data;
};
