const parseUrl = (url: string) => {
  const isQuestionMarkExist = url.includes("?");

  if (isQuestionMarkExist) {
    return url + `&key=${Math.floor(Math.random() * 1000000)}`;
  } else {
    return url + `?key=${Math.floor(Math.random() * 1000000)}`;
  }
};

export default parseUrl;
