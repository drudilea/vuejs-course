const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise((resolve) => {
    const random = Math.floor(Math.random() * 100);
    if (random > 50) {
      console.log('authenticated');
      next();
    } else {
      console.log(random, 'not authenticated');
      next({ name: 'pokemon-home' });
    }
  });
};

export default isAuthenticatedGuard;
