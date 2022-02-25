const getRandomInt = (min, max) => {
  return new Promise((resolve, reject) => {
    const rndInt = Math.floor(Math.random() * 20) + 1;
    setTimeout(() => {
      resolve(rndInt);
    }, 2000);
  });
};

export default getRandomInt;
