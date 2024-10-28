import axios from 'axios';

const adminData = [
  { hospitalName: "General Hospital" },
  { hospitalName: "City Hospital" },
  { hospitalName: "County Hospital" },
];

const tenatData = {
    hospitalName: "General Hospital",
    tenantId: "tenant-123",
    adminName: "John Doe",
    adminId: "admin-456",
  };


  const fetchAdminData = async () => {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({ data: adminData });
    //   }, 1000); 
    // });
  
    try {
      const data = await axios.get("https://proj-qsight.techo.camp/api/tenant/all");
    console.log(data);
    return data;
    } catch (error) {
      console.error('ERROR', error)
    }
  };

// Function to generate serial numbers for Screen 2 data
const addSerialNumbers = (data) => {
  return data.map((item, index) => ({
    srNo: index + 1,
    ...item,
  }));
};

// Fetch and process Screen 2 data
// export const fetchAndProcessAdminData = async () => {
//   try {
//     const response = await fetchAdminData();
//     const dataWithSerialNumbers = addSerialNumbers(response.data);
//     return dataWithSerialNumbers;
//   } catch (error) {
//     console.error("Error fetching and processing Screen 2 data:", error);
//   }
// };

export const fetchAndProcessUserData = async (tenantId) => {
  try {
    const response = await axios.get(`https://proj-qsight.techo.camp/api/tenant/info`, {
      params: { tenantId }
    });
    console.log('Tenant Info:', response.data);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching tenant info:', error);
    throw error;
  }
  };

  export const fetchAndProcessAdminData = async () => {
    try {
      const response = await fetchAdminData();
      const dataWithSerialNumbers = addSerialNumbers(response.data);
      return dataWithSerialNumbers;
    } catch (error) {
      console.error("Error fetching and processing Screen 2 data:", error);
    }
  };

