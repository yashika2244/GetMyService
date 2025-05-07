

// import ServiceProviderModel from "../Models/ServiceProviderModel.js";

// export const SearchService =  async (req, res) => {
//     try {
//         const { search } = req.query;
//         let query = {};


//         if (search) {
//             query = {
//               $or: [
//                 { name: { $regex: search, $options: 'i' } },
//                 { location: { $regex: search, $options: 'i' } },
//               ]
//             };
//           }
//           const services = await ServiceProviderModel.find(query);
//           res.json(services);
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Failed to fetch services' });
//           }
// }

import ServiceProviderModel from "../Models/ServiceProviderModel.js";

export const SearchService = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
        ]
      };
    }

    // Find services that match the search query
    const services = await ServiceProviderModel.find(query);

    if (services.length === 0) {
      return res.status(404).json({ message: 'No services found' });
    }

    // Fetch full details of the service providers
    const serviceDetails = await Promise.all(services.map(async (service) => {
      const provider = await ServiceProviderModel.findById(service._id); // Assuming you want full details
      return provider;
    }));

    // Return the full details of the services with search match
    res.json(serviceDetails);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

