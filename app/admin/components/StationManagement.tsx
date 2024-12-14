// src/components/admin/StationManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import adminApiRequests from "@/app/apiRequests/admin";
import { createStationBodyType, Station } from "@/app/interfaces";
const StationManagement = () => {
  const [stations, setStations] = useState<any>();
  const [loading, setLoading] = useState(false);

  // Fetch all stations from API
  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await adminApiRequests.station.getAll();
      setStations(response.payload.result); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new station
  const handleAddStation = async (newStation: createStationBodyType) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
      await adminApiRequests.station.create(newStation, accessToken);
      fetchStations(); // Refresh the station list
    } catch (error) {
      console.error("Error adding station:", error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const displayFields = [
    "id",
    "name",
    "address",
  ];
  const addFields = [
    { name: "name", label: "Tên ga", type: "text" },
    { name: "adrress", label: "Địa chỉ", type: "text" },
  ];

  return (
    <TabContent
      title="Quản lý Ga"
      displayFields={displayFields}
      addFields={addFields}
      data={stations?.map((station: any) => ({
        id: station.id,
        name: station.name,
        address: station.address
      }))}
      loading={loading}
    />
  );
};

export default StationManagement;
