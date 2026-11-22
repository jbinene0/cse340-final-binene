import { getFeaturedVehicles } from '../models/vehicles/vehicles.js';

const homePage = async (req, res) => {
  const vehicles = await getFeaturedVehicles();
  res.render('home', { title: 'Home', vehicles });
};

export { homePage };