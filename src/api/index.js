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

const fetchAdminData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: adminData });
    }, 1000); 
  });
};
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: tenatData });
    }, 1000); 
  });
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
    const response = await axios.get(`https://dns-ssl.online/api/tenant/info`, {
      params: { tenantId }
    });
    console.log('Tenant Info:', response.data);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching tenant info:', error);
    throw error;
  }
  };

